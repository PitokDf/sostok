// hooks/usePusher.ts
import { useEffect, useRef, useCallback } from 'react';
import { pusherClient } from '@/lib/pusher';
import type { Channel, Members } from 'pusher-js';

interface PusherEventHandlers {
    [eventName: string]: (data: any) => void;
}

export const usePusherChannel = <T = any>(
    channelName: string,
    eventName: string,
    callback: (data: T) => void
) => {
    const channelRef = useRef<Channel | null>(null);
    const handlerRef = useRef<PusherEventHandlers>({});
    const reconnectAttempts = useRef(0);

    const stableCallback = useCallback(callback, [callback]);

    const handleReconnect = useCallback(() => {
        if (reconnectAttempts.current < 5) {
            const delay = Math.min(1000 * reconnectAttempts.current ** 2, 15000);
            setTimeout(() => {
                reconnectAttempts.current += 1;
                // channelRef.current?.connect();
                pusherClient.connect()
            }, delay);
        }
    }, []);

    const setupChannel = useCallback(() => {
        try {
            if (pusherClient.connection.state !== 'connected') {
                pusherClient.connect();
            }

            const channel = pusherClient.subscribe(channelName);
            channelRef.current = channel;

            // Handle main event
            const eventHandler = (data: T) => {
                if ((data as any).sender === pusherClient.connection.socket_id) return;
                stableCallback(data);
            };

            // Handle subscription events
            const subscriptionSucceededHandler = () => {
                reconnectAttempts.current = 0;
            };

            const subscriptionErrorHandler = (error: any) => {
                console.error('Subscription error:', error);
                handleReconnect();
            };

            channel.bind(eventName, eventHandler);
            channel.bind('pusher:subscription_succeeded', subscriptionSucceededHandler);
            channel.bind('pusher:subscription_error', subscriptionErrorHandler);

            // Store handlers for cleanup
            handlerRef.current = {
                [eventName]: eventHandler,
                pusher_subscription_succeeded: subscriptionSucceededHandler,
                pusher_subscription_error: subscriptionErrorHandler
            };

        } catch (error) {
            console.error('Pusher connection error:', error);
            handleReconnect();
        }
    }, [channelName, eventName, stableCallback, handleReconnect]);

    useEffect(() => {
        const connectionStateHandler = (state: { previous: string; current: string }) => {
            if (state.current === 'failed' || state.current === 'disconnected') {
                handleReconnect();
            }
        };

        pusherClient.connection.bind('state_change', connectionStateHandler);
        setupChannel();

        return () => {
            // Cleanup channel
            if (channelRef.current) {
                Object.entries(handlerRef.current).forEach(([name, handler]) => {
                    channelRef.current?.unbind(name, handler);
                });
                pusherClient.unsubscribe(channelName);
            }

            // Cleanup connection handler
            pusherClient.connection.unbind('state_change', connectionStateHandler);
        };
    }, [setupChannel, channelName, handleReconnect]);

    // Auto-reconnect on mount/unmount
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && pusherClient.connection.state !== 'connected') {
                setupChannel();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [setupChannel]);
};
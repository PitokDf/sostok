// hooks/usePusher.ts
import { useEffect } from 'react';
import { pusherClient } from '@/lib/pusher';

export const usePusherChannel = (
    channelName: string,
    eventName: string,
    callback: (data: any) => void
) => {
    useEffect(() => {
        let channel: any;
        let reconnectTimeout: NodeJS.Timeout;
        let reconnectAttempts = 0;
        const maxReconnectAttempts = 4000;

        const connectToChannel = () => {
            try {
                console.log(`subscribing.. to chanel ${channelName}`);

                channel = pusherClient.subscribe(channelName)

                const messageHandler = (data: any) => {
                    if (data.sender === pusherClient.connection.socket_id) return
                    callback(data)
                }

                channel.bind(eventName, messageHandler)

                channel.bind('pusher:subscription_succeeded', () => {
                    reconnectAttempts = 0; // Reset counter saat berhasil connect
                });

                channel.bind('pusher:subscription_error', (error: any) => {
                    console.error('Subscription error:', error);
                    scheduleReconnect();
                });
            } catch (error) {
                console.log(error);
            }
        }

        const scheduleReconnect = () => {
            if (reconnectAttempts < maxReconnectAttempts) {
                reconnectAttempts++;
                const delay = Math.min(1000 * reconnectAttempts, 10000); // Exponential backoff
                reconnectTimeout = setTimeout(connectToChannel, delay);
                console.log(`Attempting reconnect #${reconnectAttempts} in ${delay}ms`);
            }
        };

        connectToChannel();

        const handleStateChange = (state: any) => {
            if (state.current === 'disconnected' || state.current === 'failed') {
                scheduleReconnect();
            }
        };

        pusherClient.connection.bind('state_change', handleStateChange);

        return () => {
            clearTimeout(reconnectTimeout);
            if (channel) {
                channel.unbind(eventName);
                pusherClient.unsubscribe(channelName);
            }
            pusherClient.connection.unbind('state_change', handleStateChange);
        };
    }, [channelName, eventName, callback]);
};
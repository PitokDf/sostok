import { cleanEnv } from '@/utils/cleanEnv';
import PusherClient from 'pusher-js';

const headers = {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

// Simulated Pusher configuration
export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    forceTLS: true,
    authEndpoint: `${cleanEnv(process.env.NEXT_PUBLIC_API_URL!)}/pusher/auth`,
    auth: headers,
    activityTimeout: 60000,
    pongTimeout: 30000,
    disableStats: true
});

// Simulated channel subscription
export function subscribeToChat(chatId: string, onMessage: (data: any) => void) {
    const channel = pusherClient.subscribe(`chat-${chatId}`);
    console.log(`subscribe to chanel chat-${chatId}`);

    channel.bind('new-message', onMessage);

    return () => {
        channel.unbind('new-message', onMessage);
        pusherClient.unsubscribe(`chat-${chatId}`);
    };
}

pusherClient.connection.bind('state_change', (states: any) => {
    console.log('Connection state changed from ' + states.previous + ' to ' + states.current);

});

pusherClient.connection.bind('error', (err: any) => {
    console.error('Connection error:', err);
});

// Simulated message sending
export function simulateNewMessage(message: any) {
    // In a real implementation, this would be handled by the server
    setTimeout(() => {
        const channel = pusherClient.subscribe(`chat-${message.chatId}`);
        channel.emit('new-message', {
            id: Math.random().toString(),
            content: message.content,
            sender: 'user_2',
            timestamp: new Date().toISOString(),
        });
    }, 1000);
}
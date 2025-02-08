'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Pusher from 'pusher-js';

interface Message {
    id: string;
    content: string;
    senderId: string;
    createdAt: Date;
}

const ChatPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [participant, setParticipant] = useState<any>(null);
    const { conversationId } = useParams();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const user = {};
            //   const conversation = await prisma.conversation.findUnique({
            //     where: { id: conversationId },
            //     include: {
            //       participants: true,
            //       messages: true
            //     }
            //   });

            //   if (!conversation || !user) {
            //     router.push('/');
            //     return;
            //   }

            //   const otherParticipant = conversation.participants.find(
            //     p => p.id !== user.id
            //   );

            // setParticipant(otherParticipant);
            //   setMessages(conversation.messages);
        };

        fetchData();

        // Setup Pusher
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
            channelAuthorization: {
                endpoint: '/api/pusher/auth',
                transport: 'ajax'
            }
        });

        const channel = pusher.subscribe(`conversation-${conversationId}`);

        channel.bind('new-message', (message: Message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => {
            pusher.unsubscribe(`conversation-${conversationId}`);
            pusher.disconnect();
        };
    }, [conversationId]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // await axios.post(`/api/conversations/${conversationId}/messages`, {
        //     content: newMessage
        // });

        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-screen max-w-2xl mx-auto">
            <div className="p-4 border-b flex items-center gap-2">
                <img
                    src={participant?.profilePicture || '/default-avatar.png'}
                    className="w-10 h-10 rounded-full"
                />
                <h2 className="font-semibold">{participant?.username}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={`flex ${message.senderId === participant?.id ? 'justify-start' : 'justify-end'}`}
                    >
                        <div className={`max-w-xs p-3 rounded-lg ${message.senderId === participant?.id
                            ? 'bg-gray-100'
                            : 'bg-blue-500 text-white'
                            }`}>
                            {message.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatPage;
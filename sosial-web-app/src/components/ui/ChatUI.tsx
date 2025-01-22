'use client'

import { useState, useEffect, useRef } from 'react';

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'bot';
};

export default function ChatUI() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            const newMessage: Message = {
                id: messages.length + 1,
                text: inputValue,
                sender: 'user',
            };
            setMessages([...messages, newMessage]);
            setInputValue('');
            setIsTyping(false);

            setTimeout(() => {
                const botMessage: Message = {
                    id: messages.length + 2,
                    text: `Bot reply to "${inputValue}"`,
                    sender: 'bot',
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }, 1000);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
        }, 1500); // Reset typing state after 1.5 seconds
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}
                    {isTyping && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="flex p-4 bg-gray-800">
                <textarea
                    className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white border border-gray-600 focus:outline-none resize-none"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    rows={1}
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${target.scrollHeight}px`;
                    }}
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 px-4 rounded-r-lg text-white hover:bg-blue-500"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

function MessageBubble({ message }: { message: Message }) {
    const isUser = message.sender === 'user';
    return (
        <div
            className={`max-w-xs p-3 rounded-xl shadow-lg text-sm ${isUser
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white self-end animate-slideInRight'
                : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white self-start animate-slideInLeft'
                } ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'}`}
        >
            {message.text}
        </div>
    );
}

function TypingIndicator() {
    return (
        <div className="self-start p-3 bg-gray-700 text-white rounded-xl text-sm animate-pulse">
            Bot is typing...
        </div>
    );
}

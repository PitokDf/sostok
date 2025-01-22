'use client'

import { Send } from 'lucide-react';
import { useState, useRef } from 'react';
import Button from '../Button';

export default function SendMessageUI() {
    const [inputValue, setInputValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        setInputValue(textarea.value);
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <div className='relative h-fit'>
            <textarea
                ref={textareaRef}
                className="dark:text-white bg-gray-800 bg-opacity-20 pr-11  px-3 py-2 resize-none"
                rows={1}
                value={inputValue}
                onChange={handleInput}
                placeholder="Type your message..."
            />
            <Button variant='primary' shape='rounded'>
                <Send />
            </Button>
        </div>
    );
}

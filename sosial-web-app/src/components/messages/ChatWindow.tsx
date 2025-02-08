import React, { useEffect, useRef, useState, useCallback } from "react";

interface Message {
    id: string;
    content: string;
    // properti lain sesuai kebutuhan
}

interface ChatWindowProps {
    messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    // State buat nge-track apakah user lagi ada di bawah
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    // Fungsi scroll ke bawah
    const scrollToBottom = useCallback(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, []);

    // Handler buat ngecek posisi scroll
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        // Misal, kalau jarak ke bawah kurang dari 50px, anggap user lagi di bawah
        if (scrollHeight - scrollTop - clientHeight < 50) {
            setIsAutoScroll(true);
        } else {
            setIsAutoScroll(false);
        }
    };

    // Pasang listener buat scroll
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;
        scrollContainer.addEventListener("scroll", handleScroll);
        // Cleanup listener pas component unmount
        return () => {
            scrollContainer.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Panggil scrollToBottom pas ada pesan baru dan user lagi di bawah
    useEffect(() => {
        if (isAutoScroll) {
            scrollToBottom();
        }
    }, [messages, isAutoScroll, scrollToBottom]);

    return (
        <div ref={scrollContainerRef} className="h-full overflow-auto p-4">
            {messages.map((message) => (
                <div key={message.id} className="mb-2">
                    {message.content}
                </div>
            ))}
        </div>
    );
};

export default ChatWindow;

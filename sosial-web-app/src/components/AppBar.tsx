'use client'

import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import LogoutButton from "./ui/LogoutButton";

export default function AppBar() {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // Kalau scroll ke bawah (lebih dari 10px dari posisi sebelumnya), sembunyikan header
            if (currentScrollY > lastScrollY + 10) {
                setShowHeader(false);
            }
            // Kalau scroll ke atas (lebih dari 10px naik), tampilkan header lagi
            else if (currentScrollY < lastScrollY - 10) {
                setShowHeader(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={`mb-3 sticky w-full top-0 z-50 bg-gradient-to-r from-black to-card shadow-lg border-b transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <nav className="md:max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex-shrink-0">
                        <h1 className="text-1xl font-bold text-white tracking-wide transform transition duration-500 hover:scale-105">
                            <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                                SOSTOK
                            </span>
                        </h1>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Bell className="fill-current w-5 h-5" />
                        <LogoutButton />
                    </div>
                </div>
            </nav>
        </header>
    );
}

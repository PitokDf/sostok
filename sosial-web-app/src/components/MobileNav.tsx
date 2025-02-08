"use client"

import Link from "next/link";
import { navigation } from "./Navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function MobileNavigation() {
    const pathname = usePathname()
    return (
        <nav className="fixed w-full bottom-0 left-0 right-0 z-50 border-t bg-card md:hidden">
            <div className="flex h-[3.2rem] items-center justify-around px-4">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn("flex flex-col items-center justify-center",
                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="text-xs">{item.name}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
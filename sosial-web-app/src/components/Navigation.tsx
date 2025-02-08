"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Heart, Home, LucideProps, MessageCircle, PlusSquare, Search, User2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from "react"
import { Button } from "./ui/Button"

interface TypeNavigation {
    name: string,
    href: string,
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}


export const navigation: TypeNavigation[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Create", href: "/create", icon: PlusSquare },
    { name: "Messages", href: "/messages", icon: MessageCircle },
    { name: "Profile", href: "/profile", icon: User2 }
]

export default function Navigation() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className={cn(
            "sticky left-0 min-h-screen top-0 hidden h-full border-r bg-card transition-all duration-300 md:block",
            isCollapsed ? "w-[80px]" : "w-[280px]"
        )}>
            <div className="flex h-full flex-col justify-between p-4">
                <div className="space-y-8">
                    <div className="flex items-center space-x-2">
                        <Heart className="h-8 w-8 text-primary" />
                        {!isCollapsed && <span className="text-2xl font-bold uppercase">Sostok</span>}
                    </div>

                    <nav className="space-y-2">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <Button
                                    variant={pathname === item.href ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                >
                                    <item.icon className="h-5 w-5" />
                                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="self-end absolute bottom-5"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    )
}
'use client'

import api from "@/config/axios.config";
import { User } from "@/types/post";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: User | null
    login: (credentials: { email: string; password: string }) => Promise<void>
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/auth/me");
                setUser(response.data.data);
            } catch (error: any) {
                console.error(`Error checking auth: ${error.message}`);
            } finally { setIsLoading(false) }
        }

        checkAuth();
    }, []);

    const login = async (credentials: { email: string, password: string }) => {
        try {
            const response = await api.post("/auth/login", credentials);
            setUser(response.data.data);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    const logout = () => { setUser(null) }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
"use client"

import Label from "@/components/Label";
import api from "@/config/axios.config";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { storeToLocalStorage } from "@/lib/storage";

interface LoginData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [data, setData] = useState<LoginData>({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        })
    }

    const handleFormSubmit = async (form: FormEvent) => {
        form.preventDefault();
        setIsLoading(true)
        try {
            const response = await api.post("/auth/login", data, { headers: { "Content-Type": "application/json" } });
            if (response.status == 200) {
                storeToLocalStorage('user', response.data.data)
            }
        } catch (error) {
            console.log(error);
        } finally { setIsLoading(false) }
    }

    return (
        <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Email Input */}
            <div>
                <Label htmlFor="email" >Enter email</Label>
                <Input
                    value={data.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    type="email"
                    required
                />
            </div>

            {/* Password Input */}
            <div>
                <Label htmlFor="password">Password </Label>
                <Input
                    value={data.password}
                    id="password"
                    type="password"
                    required
                    onChange={e => setData({ ...data, password: e.target.value })}
                    placeholder="Enter your password"
                />
            </div>

            {/* Login Button */}
            <div>
                <Button
                    type="submit"
                    className={`w-full`}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Login"}
                </Button>
            </div>
        </form>
    );
}
"use client"

import Label from "@/components/Label";
import api from "@/config/axios.config";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { storeToLocalStorage } from "@/lib/storage";
import { Alert, AlertDescription, AlertTitle } from "../Alert";
import { useRouter } from "next/navigation";

interface LoginData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [data, setData] = useState<LoginData>({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState("")
    const router = useRouter()

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
            router.push("/")
            // window.location.href = "/"
        } catch (error: any) {
            const errorMsg = error.response.data.msg
            setErrorMsg(errorMsg ?? "")
            console.log(error);
        } finally { setIsLoading(false) }
    }

    return (
        <>
            {errorMsg &&
                <Alert color="red" className="mb-3 bg-red-500 bg-opacity-25 text-red-100">
                    <AlertDescription>{errorMsg}</AlertDescription>
                </Alert>
            }
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
        </>
    );
}
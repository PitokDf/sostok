'use client'

import Label from "@/components/Label";
import { Input } from "../Input";
import { Button } from "../Button";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "@/config/axios.config";
import { storeToLocalStorage } from "@/lib/storage";
import { Alert, AlertDescription } from "../Alert";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [data, setData] = useState({
        email: "",
        password: "",
        username: ""
    })

    const router = useRouter()

    const [errors, setError] = useState({
        username: "",
        password: "",
        email: ""
    })

    const [isLoading, setIsLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await api.post("/auth/register", data)
            storeToLocalStorage("user", res.data.data)
            setSuccessMsg(res.data.msg)
            setError({ email: "", password: "", username: "" })
            router.push("/")
            // window.location.href = "/"
        } catch (error: any) {
            console.log(error);
            if (error.status === 400) {
                const errorsMsg = error.response.data?.errors; // errors: [{"path":"username", "msg":"error"}]
                const newErrors: any = {}
                for (const error of errorsMsg) {
                    console.log(error.path);
                    newErrors[error.path] = error.msg
                }
                setError(newErrors as any)
            }
        } finally { setIsLoading(false) }
    }
    console.log(errors.email);


    return (
        <>
            {successMsg &&
                <Alert color="red" className="mb-3 bg-green-500 bg-opacity-25 text-green-100">
                    <AlertDescription>{successMsg}</AlertDescription>
                </Alert>
            }
            <form className="space-y-4" onSubmit={handleFormSubmit}>
                {/* Email Input */}
                <div>
                    <Label htmlFor="username" >Username</Label>
                    <Input
                        value={data.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                        id="username"
                        name="username"
                        type="text"
                        required
                    />
                    {errors.username && <p className="ms-2 text-sm text-red-500">{errors.username}</p>}
                </div>
                <div>
                    <Label htmlFor="email" >Email</Label>
                    <Input
                        value={data.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        id="email"
                        name="email"
                        type="email"
                        required
                    />
                    {errors.email && <p className="ms-2 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Password Input */}
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        value={data.password}
                        id="password"
                        type="password"
                        required
                        onChange={e => setData({ ...data, password: e.target.value })}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="ms-2 text-sm text-red-500">{errors.password}</p>}
                </div>

                {/* Register Button */}
                <div>
                    <Button
                        type="submit"
                        className={`w-full`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Register"}
                    </Button>
                </div>
            </form>
        </>
    );
}
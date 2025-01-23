import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { KeySquare, Mail } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-light">
            {/* Login Card */}
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-primary text-center mb-6">Login</h2>
                <form className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-secondary mb-1"
                        >
                            Email Address
                        </label>
                        <Input
                            preffixIcon={
                                <Mail />
                            }
                            placeholder="Enter your email"
                            id="email"
                            type="email"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <Label htmlFor="password">Password </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            preffixIcon={<KeySquare />}
                        />
                    </div>

                    {/* Login Button */}
                    <div>
                        <Button
                            type="submit"
                            variant="primary"
                            size="medium"
                            shape="square"
                            className={`w-full`}
                        >
                            Login
                        </Button>
                    </div>
                </form>

                {/* Footer */}
                <p className="text-sm text-secondary text-center mt-4">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-primary hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
}

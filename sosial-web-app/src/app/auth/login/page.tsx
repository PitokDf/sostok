import LoginForm from "@/components/ui/auth/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Login SosTok',
    description: "Login ke sostok untuk masuk ke akun"
};

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-light">
            {/* Login Card */}
            <div className="w-full md:max-w-xl flex gap-4 max-w-sm bg-card p-8 rounded-lg shadow-md">
                <div className="hidden md:flex object-cover max-w-full overflow-hidden flex-1">
                    <img src="/images/logo-2.jpg" className="object-cover" alt="sostok logo" />
                </div>
                <div className="flex-1">
                    <h2 aria-label="Login" className="text-2xl font-bold text-primary text-center mb-6">Login</h2>
                    <LoginForm />
                    {/* Footer */}
                    <p className="text-sm text-center mt-4">
                        Don’t have an account?{" "}
                        <Link href="/auth/register" className="text-primary hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

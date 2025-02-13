import RegisterForm from "@/components/ui/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-light">
            {/* Login Card */}
            <div className="w-full md:max-w-xl flex gap-4 max-w-sm bg-card p-8 rounded-lg shadow-md">
                <div className="hidden md:flex object-cover max-w-full overflow-hidden flex-1">
                    <img src="/images/logo-2.jpg" className="object-cover" alt="sostok logo" />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary text-center mb-6">Register</h2>
                    <RegisterForm />
                    {/* Footer */}
                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-primary hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
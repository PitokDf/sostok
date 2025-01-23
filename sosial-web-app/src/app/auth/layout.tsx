export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-light text-black">
            {children}
        </main>
    );
}
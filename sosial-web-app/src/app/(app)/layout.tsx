import AppBar from "@/components/AppBar";
import MobileNavigation from "@/components/MobileNav";
import Navigation from "@/components/Navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <Navigation />
            <main className="w-full">
                {/* <AuthProvider> */}
                <div className="min-w-full md:min-w-full flex flex-col items-center">
                    <AppBar />
                    {children}
                </div>
                {/* </AuthProvider> */}
            </main>
            <MobileNavigation />
        </div>
    );
}
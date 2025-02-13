import AppBar from "@/components/AppBar";
import MobileNavigation from "@/components/MobileNav";
import Navigation from "@/components/Navigation";
import TanstackQueryProvider from "@/hooks/TanstackQueryProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <TanstackQueryProvider>
                <Navigation />
                <main className="w-full">
                    <div className="min-w-full md:min-w-full flex flex-col items-center">
                        <AppBar />
                        {children}
                    </div>
                </main>
                <MobileNavigation />
            </TanstackQueryProvider>
        </div>
    );
}
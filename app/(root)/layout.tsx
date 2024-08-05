import LeftSidebar from "@/components/ui/LeftSidebar";
import RightSidebar from "@/components/ui/RightSidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex flex-col">
            <main className="relative flex bg-black-3">
                <LeftSidebar />
                {children}
                <RightSidebar />
            </main>
        </div>
    );
}

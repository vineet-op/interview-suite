// /(dashboard)/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="text-teal-500 hover:bg-black hover:text-teal-500 cursor-pointer" />
            {children}
        </SidebarProvider>
    );
}
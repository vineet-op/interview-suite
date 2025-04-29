// app/agent/layout.tsx
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AgentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <AppSidebar />
            <main className="flex-1">
                <SidebarTrigger />
                {children}
            </main>
        </div>
    );
}

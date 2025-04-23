import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Interview",
        url: "/interview",
        icon: Home,
    },
    {
        title: "My Resume",
        url: "/resume",
        icon: Inbox,
    },
    {
        title: "LinkedIn Optimizations",
        url: "/linkedin",
        icon: Calendar,
    },
    {
        title: "Portfolio",
        url: "/portfolio",
        icon: Search,
    },
    {
        title: "Applications",
        url: "/applications",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup >
                    <SidebarGroupLabel className="font-bold text-blue-400 text-base">Prep-Suite</SidebarGroupLabel>
                    <SidebarGroupContent className="mt-2">
                        <SidebarMenu className="flex flex-col gap-5">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

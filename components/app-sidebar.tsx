import { Calendar, Home, Inbox } from "lucide-react"

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
import { SignOutButton } from '@clerk/nextjs'

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
        title: "OutReach Templates",
        url: "/templates",
        icon: Calendar,
    },
]

export function AppSidebar() {
    return (
        <div>
            <Sidebar>
                <SidebarContent className="border-b border-gray-800 bg-gray-950">
                    <SidebarGroup>
                        <SidebarGroupLabel className="font-bold text-teal-500 font-sans text-xl">Prep-Suite</SidebarGroupLabel>
                        <SidebarGroupContent className="mt-5">
                            <SidebarMenu className="flex flex-col gap-5">
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon className="text-teal-300" />
                                                <span className="font-sans text-teal-300">{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <div className="mt-8 mx-auto bg-red-500 text-white px-8 hover:bg-red-600 py-2 font-sans rounded-2xl">
                        <SignOutButton />
                    </div>
                </SidebarContent >
            </Sidebar >
        </div>
    )
}

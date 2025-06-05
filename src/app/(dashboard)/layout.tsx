"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Workflow, Settings, LogOut, Crown, Zap, User } from "lucide-react"

const navigation = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: BarChart3,
    },
    {
        name: "Workflows",
        href: "/workflows",
        icon: Workflow,
    },
]

function DashboardLayout({
    children,
}:{
    children: ReactNode
}) {
    const pathname = usePathname();
    const [user] = useState({
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        plan: "Free", // Free, Pro, Business
        credits: 85,
        maxCredits: 100,
    })

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar className="border-r border-gray-200">
                    <SidebarHeader className="border-b border-gray-200 p-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Workflow className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">TaskChain</span>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="p-4">
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {navigation.map((item) => (
                                        <SidebarMenuItem key={item.name}>
                                            <SidebarMenuButton asChild isActive={pathname === item.href} className="w-full justify-start">
                                                <Link href={item.href}>
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.name}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter className="border-t border-gray-200 p-4">
                        <div className="mt-6 mb-6 p-3 bg-gray-100 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Credits</span>
                                <Badge variant={user.plan === "Free" ? "secondary" : "default"}>{user.plan}</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm text-gray-600">
                                    {user.credits} / {user.maxCredits}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                    style={{ width: `${(user.credits / user.maxCredits) * 100}%` }}
                                />
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start p-2">
                                    <Avatar className="h-8 w-8 mr-3">
                                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                        <AvatarFallback>
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                        <span className="text-xs text-gray-500">{user.email}</span>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                {user.plan === "Free" && (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link href="/upgrade">
                                                <Crown className="mr-2 h-4 w-4 text-yellow-500" />
                                                Upgrade to Pro
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />
                                    </>
                                )}
                                {user.plan === "Pro" && (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link href="/upgrade">
                                                <Crown className="mr-2 h-4 w-4 text-purple-500" />
                                                Upgrade to Business
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />
                                    </>
                                )}

                                <DropdownMenuItem className="text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarFooter>
                </Sidebar>

                <div className="flex-1 flex flex-col w-7xl">
                    <header className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {pathname === "/dashboard" && "Dashboard"}
                                {pathname === "/workflows" && "Workflows"}
                                {pathname === "/settings" && "Settings"}
                                {pathname === "/upgrade" && "Upgrade Plan"}
                            </h1>
                        </div>
                    </header>

                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout

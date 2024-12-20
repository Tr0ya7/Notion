"use client"

import Navigation from "@/components/DocumentsPage/Navigation"
import Spinner from "@/components/Spinner"
import { SearchCommand } from "@/components/ui/search-command"
import { useConvexAuth } from "convex/react"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

interface MainLayoutProps {
    children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => { 
    const { isAuthenticated, isLoading } = useConvexAuth()
    
    if (isLoading) <div className="h-full flex items-center justify-center"><Spinner size="lg" /></div>
    if (!isAuthenticated) redirect('/')

    return <div className="h-full flex dark:bg-[#1f1f1f]"><Navigation /><main className="flex-1 h-full overflow-y-auto"><SearchCommand />{ children }</main></div>
}

export default MainLayout
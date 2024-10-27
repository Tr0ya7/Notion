"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils"
import Logo from "../Logo"
import { ModeToggle } from "../mode-toggle"
import { useConvexAuth } from "convex/react"
import { SignInButton, UserButton } from "@clerk/clerk-react"
import { Button } from "../ui/button"
import Spinner from "../Spinner"
import Link from "next/link"

const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const scrolled = useScrollTop()

    return (
        <div className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}> {/* quando scrollado adiciona a borda logo abaixo */}
            <Logo />
            <div className="justify-between w-full flex items-center gap-x-2 md:ml-auto md:justify-end">
                {isLoading && <p><Spinner /></p>}
                {!isAuthenticated && !isLoading &&
                    <><SignInButton mode="modal"><Button variant="ghost" size="sm">Log in</Button></SignInButton><SignInButton mode="modal"><Button size="sm">Get Notion free</Button></SignInButton></>            
                }
                {isAuthenticated && !isLoading && 
                    <><Button variant="ghost" size="sm" asChild><Link href="/documents">Enter Notion</Link></Button><UserButton afterSwitchSessionUrl="/" /></>
                }
                <ModeToggle />
            </div>
        </div>
    )
}

export default Navbar
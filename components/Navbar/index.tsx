"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils"
import Logo from "../Logo"
import { ModeToggle } from "../mode-toggle"

const Navbar = () => {
    const scrolled = useScrollTop()

    return (
        <div className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}> {/* quando scrollado adiciona a borda logo abaixo */}
            <Logo />
            <div className="justify-between w-full flex items-center gap-x-2 md:ml-auto md:justify-end">
                Login
                <ModeToggle />
            </div>
        </div>
    )
}

export default Navbar
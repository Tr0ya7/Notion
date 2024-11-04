import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Image from "next/image"
import LogoImage from "./logo-image"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
})

const Logo = () => (
    <div className="hidden items-center gap-x-2 md:flex">
        <LogoImage />
        <p className={cn("font-semibold", poppins.className)}>
            Notion
        </p>
    </div>
)

export default Logo
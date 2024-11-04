import Logo from "../Logo"
import { Button } from "../../ui/button"

const Footer = () => (
    <div className="flex items-center w-full p-6 bg-background z-50">
        <Logo />
        <div className="w-full justify-between flex items-center gap-x-2 text-muted-foreground md:ml-auto md:justify-end">
            <Button variant="ghost" size="sm">
                Privacy Policy
            </Button>
            <Button variant="ghost" size="sm">
                Terms & Condition
            </Button>
        </div>
    </div>
)

export default Footer
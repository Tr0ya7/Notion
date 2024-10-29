import { Button } from "@/components/ui/button"
// import { useUser } from "@clerk/clerk-react"
import { PlusCircle } from "lucide-react"
import Image from "next/image"

const DocumentsPage = () => {
    // const { user } = useUser()

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4 min-h-screen">
            <Image className="dark:hidden" src="/empty.png" height="300" width="300" alt="Empty" />
            <Image className="hidden dark:block" src="/empty-dark.png" height="300" width="300" alt="Empty" />
            {/* <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s Notion
            </h2> */}
            <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a note
            </Button>
        </div>
    )
}

export default DocumentsPage
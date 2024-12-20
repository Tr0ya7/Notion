"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const Error = () => (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image className="dark:hidden" src="/error.png" width="300" height="300" alt="Error" />
        <Image className="hidden dark:block" src="/error-dark.png" width="300" height="300" alt="Error" />
        <h2 className="text-xl font-medium">
            Something went wrong!
        </h2>
        <Button asChild>
            <Link href="/documents">
                Go back
            </Link>
        </Button>
    </div>
)

export default Error
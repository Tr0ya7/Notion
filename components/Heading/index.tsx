"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

const Heading = () => (    
    <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
            Your Ideas, Documents, & Plans, Unified, Welcome to <span className="underline">Notion</span>
        </h1>
        <h3 className="text-base font-medium sm:text-xl md:text-2xl">
            Notion is the conected workspace where <br />
            better, faster work happens.
        </h3>
        <Button>
            Enter Notion
            <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
    </div>
)

export default Heading
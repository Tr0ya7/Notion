"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react"

interface TitleProps {
    initialData: Doc<"documents">
}

const Title = ({ initialData }: TitleProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const update = useMutation(api.documents.update)

    const [title, setTitle] = useState(initialData.title || "Untitled")
    const [isEditing, setIsEnding] = useState(false)

    const enableInput = () => {
        setTitle(initialData.title)
        setIsEnding(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0)
    }

    const disabledInput = () => {
        setIsEnding(false)
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        update({
            id: initialData._id,
            title: event.target.value || "Untitled"
        })
    }
    
    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") disabledInput()
    }

    return ( 
        <div className="flex items-center gap-x-1">
            { !!initialData.icon && <p>{ initialData.icon }</p> }
            {isEditing 
                ? 
                    <Input 
                        ref={inputRef} 
                        className="h-7 px-2 focus-visible:ring-transparent" 
                        value={title} 
                        onChange={(event) => onChange(event)} 
                        onClick={() => enableInput()} 
                        onBlur={() => disabledInput()} 
                        onKeyDown={(event) => onKeyDown(event)} 
                    />
                : 
                    <Button className="font-normal h-auto p-1" size="sm" variant="ghost" onClick={() => enableInput()} ><span className="truncate">{ initialData?.title }</span></Button>
            }
        </div>
    )
}

export default Title

Title.Skeleton = function TitleSkeletom() {
    return <Skeleton className="h-9 w-20 rounded-md" />
}
"use client"

import { Doc } from "@/convex/_generated/dataModel"
import IconPicker from "../IconPicker"
import { Button } from "@/components/ui/button"
import { ImageIcon, Smile, X } from "lucide-react"
import { ElementRef, KeyboardEvent, useRef, useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import TextareaAutosize from "react-textarea-autosize"
import { useCoverImage } from "@/hooks/useCoverImage"

interface ToolbarProps {
    initialData: Doc<"documents">
    preview?: boolean
}

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null)
    const coverImage = useCoverImage()
    
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(initialData.title)
    
    const update = useMutation(api.documents.update)
    const removeIcon = useMutation(api.documents.removeIcon)

    const enableInput = () => {
        if (preview) return

        setIsEditing(true)
        setTimeout(() => {
            setValue(initialData.title)
            inputRef.current?.focus()
        }, 0)
    }

    const disabledInput = () => setIsEditing(false)

    const onInput = (value: string) => {
        setValue(value)
        update({ id: initialData._id, title: value || "Untitled" })
    }

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault()
            disabledInput()
        }
    }

    const onIconSelect = (icon: string) => {
        update({ id: initialData._id, icon })
    }

    const onRemoveIcon = () => {
        removeIcon({ id: initialData._id })
    }

    return (
        <div className="pl-[54px] group relative">
            { !!initialData.icon && !preview && 
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={onIconSelect}> {/* */}
                        <p className="text-6xl transition hover:opacity-75">
                            { initialData.icon }
                        </p>
                    </IconPicker>
                    <Button className="rounded-full opacity-0 transition text-muted-foreground text-xs group-hover/icon:opacity-100" variant="outline" size="icon" onClick={() => onRemoveIcon()}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            }
            { !!initialData.icon && preview && <p className="text-6xl pt-6">{ initialData.icon }</p> }
            <div className="opacity-0 flex items-center gap-x-1 py-4 group-hover:opacity-100">
                { !initialData.icon && !preview && 
                    <IconPicker onChange={onIconSelect} asChild><Button className="text-muted-foreground text-xs" variant="outline" size="sm"><Smile className="w-4 h-4 mr-2" />Add icon</Button></IconPicker>
                } {/* */}
                { !initialData.coverImage && !preview && 
                    <Button className="text-muted-foreground text-sm" variant="outline" size="sm" onClick={() => coverImage.onOpen()}><ImageIcon className="w-4 h-4 mr-2" />Add cover</Button>  
                }
            </div>
            {isEditing && !preview 
                ? 
                    <TextareaAutosize
                        ref={inputRef} 
                        value={value} 
                        className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] resize-none dark:text-[#cfcfcf]" 
                        onBlur={() => disabledInput()} 
                        onKeyDown={(event) => onKeyDown(event)} 
                        onChange={(event) => onInput(event?.target.value)}
                    /> 
                : <div className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]" onClick={() => enableInput()}>{ initialData.title }</div>
            }
        </div>
    )
}

export default Toolbar
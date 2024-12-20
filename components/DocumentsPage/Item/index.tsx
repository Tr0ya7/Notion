"use client"

import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react"
import { Skeleton } from "../../ui/skeleton"
import { MouseEvent } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu"
// import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
// import { useUser } from "@clerk/clerk-react"

interface ItemProps {
    id?: Id<"documents">
    documentIcon?: string
    active?: boolean
    expanded?: boolean
    isSearch?: boolean
    level?: number
    onExpand?: () => void
    label: string
    onClick?: () => void
    icon: LucideIcon
}

const Item = ({ id, documentIcon, active, isSearch, level = 0, onExpand, expanded, label, onClick, icon: Icon }: ItemProps) => {
    const ChevronIcon = expanded  ? ChevronDown : ChevronRight
    const create = useMutation(api.documents.create)
    const router = useRouter()
    // const user = useUser()
    const archive = useMutation(api.documents.archive)
    
    const handleExpanded = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        onExpand?.()
    }
    
    const onCreate = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        if (!id) return
        
        const promise = create({ title: "Untitled", parentDocument: id })
            .then((documentId) => { 
                if (!expanded) onExpand?.()

                router.push(`/documents/${documentId}`)
            })

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note"
        })
    }

    const onArchive = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        if (!id) return
        
        const promise = archive({ id }).then(() => router.push("/documents"))

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note"
        })
    }

    return (
        <div 
            role="button" 
            className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full flex items-center text-muted-foreground font-medium hover:bg-primary/5", active && "bg-primary/5 text-primary")}
            onClick={ onClick } 
            style={{ paddingLeft: level ? `${(level * 12) + 12}px` : "12px" }}
        >
            {!!id && 
                <div role="button" className="h-full rounded-sm mr-1 hover:bg-neutral-300 dark:hover:bg-neutral-600" onClick={(event) => handleExpanded(event)}>
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </div>
            }
            {documentIcon ? <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div> : <Icon className="shrink-0 w-[18px] h-[18px] mr-2 text-muted-foreground" />}
            <span className="truncate">
                { label }
            </span>
            {isSearch && 
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">                    
                    CRTL + K
                </kbd>
            }
            {!!id && 
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger onClick={(event) => event.stopPropagation()} asChild>
                            <div role="button" className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
                            <DropdownMenuItem onClick={(event) => onArchive(event)}>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                            {/* <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground p-2">
                                Last edition {user?.fullName}
                            </div> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div role="button" onClick={(event) => onCreate(event)} className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            }
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return <div className="flex gap-x-2 py-[3px]" style={{ paddingLeft: level ? `${(level * 12) + 25}px` : "12px" }}><Skeleton className="h-4 w-4" /><Skeleton className="h-4 w-[30%]" /></div>
}

export default Item
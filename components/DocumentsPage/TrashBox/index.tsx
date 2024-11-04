"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { MouseEvent, useState } from "react"
import { toast } from "sonner"
import Spinner from "../../LandingPage/Spinner"
import { Search, Trash, Undo } from "lucide-react"
import { Input } from "../../ui/input"
import ConfirmModal from "../modals/ConfirmModal"

const TrashBox = () => {
    const router = useRouter()
    const params = useParams()
    const documents = useQuery(api.documents.getTrash)
    const restore = useMutation(api.documents.restore)
    const remove = useMutation(api.documents.remove)

    const [search, setSearch] = useState("")

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase())
    })

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    const onRestore = (event: MouseEvent<HTMLDivElement>, documentId: Id<"documents">) => {
        event.stopPropagation()
        const promise = restore({ id: documentId })

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note"
        })
    }

    const onRemove = (documentId: Id<"documents">) => {        
        const promise = restore({ id: documentId })

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note"
        })

        if (params.documentId === documentId) router.push("/documents")
    }

    if (documents === undefined) return <div className="h-full flex items-center justify-center p-4"><Spinner size="lg" /></div>

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4" />
                <Input className="h-7 px-2 bg-secondary focus-visible:ring-transparent" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Filter by page title..." />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden text-xs text-center text-muted-foreground pb-2 last:block">
                    No documents found
                </p>
                {filteredDocuments?.map((document) => (
                    <div role="button" className="text-sm rounded-sm w-full flex items-center text-primary justify-between hover:bg-primary/5" key={document._id} onClick={() => onClick(document._id)}>
                        <span className="truncate pl-2">
                            {document.title}
                        </span>
                        <div className="flex items-center">
                            <div role="button" className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600" onClick={(event) => onRestore(event, document._id)}>
                                <Undo role="button" className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document._id)}>
                                <div role="button" className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                                    <Trash className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrashBox
"use client"

import Cover from "@/components/DocumentsPage/Cover"
import ToolBar from "@/components/DocumentsPage/Toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import dynamic from "next/dynamic"
import { useMemo } from "react"

interface DocumentPageProps {
    params: {
        documentId: Id<"documents">
    }
}

const DocumentIdPage = ({ params }: DocumentPageProps) => {
    const update = useMutation(api.documents.update)
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    })

    const Editor = useMemo(() => dynamic(() => import("@/components/DocumentsPage/Editor"), { ssr: false }), [])

    if (document === undefined) 
        return (
            <div>
                <Cover.Skeleton />
                <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="w-[50%] h-14" />
                        <Skeleton className="w-[80%] h-4" />
                        <Skeleton className="w-[40%] h-4" />
                        <Skeleton className="w-[60%] h-4" />
                    </div>
                </div>
            </div>
        )
    if (document === null) return <div>Not found</div>

    const onChange = (content: string) => {
        update({
            id: params.documentId,
            content
        })
    }

    return (
        <div className="pb-40">
            <Cover url={document.coverImage} />
            <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
                <ToolBar initialData={document} />
                <Editor initialContent={document.content} onChange={onChange} />
            </div>
        </div>
    )
}

export default DocumentIdPage
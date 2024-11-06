"use client"

import Cover from "@/components/DocumentsPage/Cover"
import ToolBar from "@/components/DocumentsPage/Toolbar"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

interface DocumentPageProps {
    params: {
        documentId: Id<"documents">
    }
}

const DocumentIdPage = ({ params }: DocumentPageProps) => {
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    })

    if (document === undefined) return <div>Loading...</div>
    if (document === null) return <div>Not found</div>

    return <div className="pb-40"><Cover url={document.coverImage} /><div className="mx-auto md:max-w-3xl lg:max-w-4xl"><ToolBar initialData={document} /></div></div>
}

export default DocumentIdPage
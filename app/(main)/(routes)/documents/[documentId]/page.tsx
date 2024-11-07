"use client"

import Cover from "@/components/DocumentsPage/Cover"
import Editor from "@/components/DocumentsPage/Editor"
import ToolBar from "@/components/DocumentsPage/Toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

interface DocumentPageProps {
  params: {
    documentId: Id<"documents">
  };
}

const DocumentIdPage = ({ params }: DocumentPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
  })

  if (document === undefined) {
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
  }

  if (document === null) return <div>Not found</div>

  return <div className="pb-40"><Cover url={document.coverImage} /><div className="mx-auto md:max-w-3xl lg:max-w-4xl"><ToolBar initialData={document} /><Editor /></div></div>
}

export default DocumentIdPage
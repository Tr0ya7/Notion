"use client"

import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import { BlockNoteView } from "@blocknote/mantine"
import { useCreateBlockNote } from "@blocknote/react"
import { useTheme } from "next-themes"
import { useEdgeStore } from "@/lib/edgestore"

interface EditorProps {
    onChange: (value: string) => void
    initialContent?: string
    editable?: boolean
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
    const editor = useCreateBlockNote()
    const { resolvedTheme } = useTheme()
    const { edgestore } = useEdgeStore()

    // const handleUpload = async (file: File) => {
    //     const response = await edgestore.publicFiles.upload({ file })

    //     return response.url
    // }
 
    return <BlockNoteView editor={editor} theme={resolvedTheme === "dark" ? "dark" : "light"} />
}

export default Editor
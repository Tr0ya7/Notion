"use client"

import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import { BlockNoteView } from "@blocknote/mantine"
import { useCreateBlockNote } from "@blocknote/react"
import { useTheme } from "next-themes"

const Editor = () => {
    const editor = useCreateBlockNote()
    const { resolvedTheme } = useTheme()
 
    return <BlockNoteView editor={editor} theme={resolvedTheme === "dark" ? "dark" : "light"} />
}

export default Editor
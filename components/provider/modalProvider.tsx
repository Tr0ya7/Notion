"use client"

import { useEffect, useState } from "react"
import { SettingsModal } from "../DocumentsPage/modals/SettingModal"
import CoverImageModal from "../DocumentsPage/modals/CoverImageModal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => setIsMounted(true), [])

    if (!isMounted) return null
    
    return <><SettingsModal /><CoverImageModal /></>
} 
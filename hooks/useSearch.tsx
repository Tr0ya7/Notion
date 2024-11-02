import { create } from "zustand"

type SearchStore = { // type porque não é um componente que possui props
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    toggle: () => void
}

export const useSearch = create<SearchStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    toggle: () => set({ isOpen: !get().isOpen })
}))
import { create } from "zustand"

type MobileSidebarStore = {
    isOpen: boolean
    OnOpen: () => void
    OnClose: () => void
}

export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
    isOpen: false,
    OnOpen: () => set({ isOpen: true }),
    OnClose: () => set({ isOpen: false }),
}))

'use client'

import { create} from 'zustand'

type PropertiesModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const usePropertiesModal = create<PropertiesModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default usePropertiesModal
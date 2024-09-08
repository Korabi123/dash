import { create } from 'zustand';

export type ModalStoreType = "initializeInfo"

interface ModalStoreData {
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalStoreType | null;
  data: ModalStoreData;
  isOpen: boolean;
  onOpen: (type: ModalStoreType, data?: ModalStoreData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data) => {
    set({ type, data, isOpen: true });
  },
  onClose: () => {
    set({ type: null, data: {}, isOpen: false });
  },
}));

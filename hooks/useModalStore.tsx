import { create } from 'zustand';

export type ModalStoreType = "createTransaction" | "editTransaction" | "deleteTransaction" | "createAccount" | "editAccount" | "deleteAccount" | "createCategory" | "editCategory" | "deleteCategory";

interface ModalStoreData {
  apiUrl?: string;
  query?: Record<string, any>;
  transactionId?: string;
  accountId?: string;
  categoryId?: string;
}

interface ModalStore {
  type: ModalStoreType | null;
  data: ModalStoreData;
  isOpen: boolean;
  onOpen: (type: ModalStoreType, data?: ModalStoreData) => void;
  onClose: () => void;
  reset: () => void;
}

const initialState = {
  date: undefined,
  categoryName: "",
  accountName: "",
  payee: "",
  amount: 0,
};

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
  reset: () => {
    // @ts-ignore
    set(initialState)
  },
}));

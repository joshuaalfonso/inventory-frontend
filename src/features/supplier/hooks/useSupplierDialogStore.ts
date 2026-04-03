

import { create } from 'zustand';
import type { Suppliers } from '../supplier.model';

interface SupplierDialogState {
  isOpen: boolean;
  selectedItem: Suppliers | null;
  openDialog: (item?: Suppliers | null) => void;
  closeDialog: () => void;
}

export const useSupplierDialogStore = create<SupplierDialogState>((set) => ({
  isOpen: false,  
  selectedItem: null,

  openDialog: (item) => set({ isOpen: true, selectedItem: item ?? null }),
  closeDialog: () => set({ isOpen: false, selectedItem: null }),
}));

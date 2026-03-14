import type { Brands } from "../brand.model";
import { create } from 'zustand';

interface BrandDialogState {
  isOpen: boolean;
  selectedItem: Brands | null;
  openDialog: (item?: Brands | null) => void;
  closeDialog: () => void;
}

export const useBrandDialogStore = create<BrandDialogState>((set) => ({
  isOpen: false,  
  selectedItem: null,

  openDialog: (item) => set({ isOpen: true, selectedItem: item ?? null }),
  closeDialog: () => set({ isOpen: false, selectedItem: null }),
}));

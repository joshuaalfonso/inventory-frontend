import { create } from 'zustand';
import type { Categories } from '../category.model';

interface CategoryDialogState {
  isOpen: boolean;
  selectedItem: Categories | null;
  openDialog: (item?: Categories | null) => void;
  closeDialog: () => void;
}

export const useCategoryDialogStore = create<CategoryDialogState>((set) => ({
  isOpen: false,  
  selectedItem: null,

  openDialog: (item) => set({ isOpen: true, selectedItem: item ?? null }),
  closeDialog: () => set({ isOpen: false, selectedItem: null }),
}));

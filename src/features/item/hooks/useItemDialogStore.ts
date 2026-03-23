

import { create } from 'zustand';
import type { ItemList } from '../item.model';

interface ItemDialogState {
  isOpen: boolean;
  selectedItem: ItemList | null;
  openDialog: (item?: ItemList | null) => void;
  closeDialog: () => void;
}

export const useItemDialogStore = create<ItemDialogState>((set) => ({
  isOpen: false,  
  selectedItem: null,

  openDialog: (item) => set({ isOpen: true, selectedItem: item ?? null }),
  closeDialog: () => set({ isOpen: false, selectedItem: null }),
}));

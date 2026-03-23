

import { create } from 'zustand';
import type { ItemTypes } from '../itemType.model';

interface ItemTypeDialogState {
  isOpen: boolean;
  selectedItem: ItemTypes | null;
  openDialog: (item?: ItemTypes | null) => void;
  closeDialog: () => void;
}

export const useItemTypeDialogStore = create<ItemTypeDialogState>((set) => ({
  isOpen: false,  
  selectedItem: null,

  openDialog: (item) => set({ isOpen: true, selectedItem: item ?? null }),
  closeDialog: () => set({ isOpen: false, selectedItem: null }),
}));

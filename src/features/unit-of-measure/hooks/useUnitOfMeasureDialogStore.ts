

import { create } from 'zustand';
import type { UnitOfMeasures } from '../unitOfMeasure.model';

interface UnitOfMeasureDialogState {
  isOpen: boolean;
  selectedItem: UnitOfMeasures | null;
  openDialog: (item?: UnitOfMeasures | null) => void;
  closeDialog: () => void;
}

export const useUnitOfMeasureDialogStore = create<UnitOfMeasureDialogState>((set) => ({
  isOpen: false,  
  selectedItem: null,

  openDialog: (item) => set({ isOpen: true, selectedItem: item ?? null }),
  closeDialog: () => set({ isOpen: false, selectedItem: null }),
}));

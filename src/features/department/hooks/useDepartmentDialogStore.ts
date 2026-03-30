
import { create } from 'zustand';
import type { Departments } from '../department.model';

interface DepartmentDialogState {
  isOpen: boolean;
  selectedItem: Departments | null;
  openDialog: (item?: Departments | null) => void;
  closeDialog: () => void;
}

export const useDepartmentDialogStore = create<DepartmentDialogState>((set) => ({
  isOpen: false,  
  selectedItem: null,

  openDialog: (item) => set({ isOpen: true, selectedItem: item ?? null }),
  closeDialog: () => set({ isOpen: false, selectedItem: null }),
}));

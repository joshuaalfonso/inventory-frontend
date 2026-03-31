



import { create } from 'zustand';
import type { Employees } from '../employee.model';

interface EmployeeDialogState {
  isOpen: boolean;
  selectedItem: Employees | null;
  openDialog: (item?: Employees | null) => void;
  closeDialog: () => void;
}

export const useEmployeeDialogStore = create<EmployeeDialogState>((set) => ({
  isOpen: false,  
  selectedItem: null,

  openDialog: (item) => set({ isOpen: true, selectedItem: item ?? null }),
  closeDialog: () => set({ isOpen: false, selectedItem: null }),
}));

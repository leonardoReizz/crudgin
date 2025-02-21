import { Customer } from "@prisma/client";
import { create } from "zustand";

type DeleteCustomerState = {
  customers?: Customer[];
  isOpen: boolean;
  onOpen: (customers: Customer[]) => void;
  onClose: () => void;
};

export const useDeleteCustomer = create<DeleteCustomerState>((set) => ({
  customers: [],
  isOpen: false,
  onOpen: (customers: Customer[]) => set({ isOpen: true, customers }),
  onClose: () => set({ isOpen: false, customers: [] }),
}));

import { VendorType } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  vendorTypes: VendorType[];
};

export type Actions = {
  setVendorTypes: (temp: VendorType[] | null) => void;
};

export const useVendorContext = create<State & Actions>()(
  persist(
    (set) => ({
      vendorTypes: [],
      setVendorTypes: (temp) => set((state) => ({ vendorTypes: temp || [] }))
    }),
    { name: "vendor-context", skipHydration: false }
  )
);

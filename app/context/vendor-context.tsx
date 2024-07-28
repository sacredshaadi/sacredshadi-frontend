import { ICity } from "@/types";
import { Vendor, VendorType } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  vendorTypes: VendorType[];
  cities: ICity[];
  // vendorProfile: Vendor | null;
};

export type Actions = {
  setVendorTypes: (temp: VendorType[] | null) => void;
  setCities: (temp: ICity[] | null) => void;
  // setVendorProfile: (temp: Vendor | null) => void;
};

export const useVendorContext = create<State & Actions>()(
  persist(
    (set) => ({
      // vendorProfile: null,
      vendorTypes: [],
      cities: [],
      setVendorTypes: (temp) => set((state) => ({ vendorTypes: temp || [] })),
      setCities: (temp) => set((state) => ({ cities: temp || [] }))
      // setVendorProfile: (temp) => set((state) => ({ vendorProfile: temp || null }))
    }),
    { name: "vendor-context", skipHydration: false }
  )
);

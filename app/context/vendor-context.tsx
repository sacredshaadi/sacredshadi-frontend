import { ICity } from "@/types";
import { Vendor, VendorSubType, VendorType } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  vendorTypes: VendorType[];
  cities: ICity[];
  vendorSubTypes: VendorSubType[];
  // vendorProfile: Vendor | null;
};

export type Actions = {
  setVendorTypes: (temp: VendorType[] | null) => void;
  setCities: (temp: ICity[] | null) => void;
  setVendorSubTypes: (temp: VendorSubType[] | null) => void;
  // setVendorProfile: (temp: Vendor | null) => void;
};

export const useVendorContext = create<State & Actions>()(
  persist(
    (set) => ({
      vendorTypes: [],
      cities: [],
      vendorSubTypes: [],
      setVendorTypes: (temp) => set((state) => ({ vendorTypes: temp || [] })),
      setCities: (temp) => set((state) => ({ cities: temp || [] })),
      setVendorSubTypes: (temp) => set((state) => ({ vendorSubTypes: temp || [] }))
    }),
    { name: "vendor-context", skipHydration: false }
  )
);

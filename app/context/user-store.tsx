import { create } from "zustand";
import { persist } from "zustand/middleware";
export type State = {};

export type Actions = {};

export const useCustomerStore = create<State & Actions>()(
  persist((set) => ({}), { name: "customer-store", skipHydration: true })
);

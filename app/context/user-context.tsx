import { User } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  user: User | null;
};

export type Actions = {
  setUser: (user: User | null) => void;
};

export const useUserContext = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user })
    }),
    { name: "user-context", skipHydration: true }
  )
);

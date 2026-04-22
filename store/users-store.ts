import { create } from "zustand";
import { IUser } from "@/interfaces";

export const useUsersStore = create<{
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}>((set) => ({
    user: null,

    setUser: (user) => set({ user }),
}));
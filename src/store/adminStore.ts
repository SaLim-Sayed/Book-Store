import { create } from "zustand";
import { MenuStore, MenuStoreActions } from "./type/admin";

// Define the types for menu status and actions

// Create the Zustand store
export const useMenuStore = create<MenuStore & MenuStoreActions>((set) => ({
  menuStatus: "Admin Panel",
  userMenuStatus: "Dashboard",
  menuStatusSetter: (menuStatus) => set({ menuStatus }),
  userMenuStatusSetter: (userMenuStatus) => set({ userMenuStatus }),
}));


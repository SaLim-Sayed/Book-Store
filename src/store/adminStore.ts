import { create } from "zustand";
import { MenuStore, MenuStoreActions } from "./type/admin";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the types for menu status and actions

// Create the Zustand store
export const useMenuStore = create(
  persist<MenuStore & MenuStoreActions>((set) => ({
    menuStatus: "Admin Panel",
    userMenuStatus: "Dashboard",
    menuStatusSetter: (menuStatus) => set({ menuStatus }),
    userMenuStatusSetter: (userMenuStatus) => set({ userMenuStatus }),
  }),
  {
    name: "searchParams",
    storage: createJSONStorage(() => sessionStorage),
  }
)
);


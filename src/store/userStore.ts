// userStore.ts
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: number;
  } | null;
  token: string | null;
  setUserAndToken: (user: UserStore["user"], token: UserStore["token"]) => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      token: null,
      setUserAndToken: (user, token) => set({ user, token }),
    }),
    {
      name: "user-storage", // Optional name for the persisted storage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

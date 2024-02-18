/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from 'zustand';

interface productStore {
  products: any   ;
  setProducts: (products: any ) => void;
}

export const useProductStore = create<productStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));

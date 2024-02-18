/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from 'zustand';

interface CategoryStore {
  categories: any   ;
  setCategories: (categories: any ) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));

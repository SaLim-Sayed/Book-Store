import {create} from 'zustand';

interface ICategory {
  name: string;
  _id: string;
  slug: string;
  
  // Add more properties as needed
}

interface CategoryStore {
  categories: ICategory[] | undefined  ;
  setCategories: (categories: ICategory[] | undefined) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));

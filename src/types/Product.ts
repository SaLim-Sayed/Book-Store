import { ICategory } from "./Category";

export type IProduct = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: ICategory;
  quantity: number;
  photo: string;
};

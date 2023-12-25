import { Item } from "./ItemTypes";

export type Order = {
  createdAt: string;
  id: number;
  items: Item[];
  updatedAt: string;
  userId: number;
};

export type Item = {
  id: number;
  name: string;
  category: string;
  description: string;
  imagePath: string;
  price: number;
  sold: boolean;
  userId?: number;
};

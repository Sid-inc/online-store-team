export enum Cover {
  HARDCOVER = 'Hardcover',
  PAPERBACK = 'Paperback',
}

export interface Book {
  category: string;
  id: number;
  title: string;
  author: string;
  price: number;
  urlToImages: string[];
  rating: number;
  isBestSeller: boolean;
  cover: Cover;
  description: string;
  amount: number;
}

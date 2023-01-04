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

export interface SettingsForSort {
  search: string;
  sort: string;
  category: string[];
  author: string[];
  priceMin: number;
  priceMax: number;
  countMin: number;
  countMax: number;
}

export interface Queries {
  search?: string;
  sort?: string;
  category?: string[];
  author?: string[];
  priceMin?: string;
  priceMax?: string;
  countMin?: string;
  countMax?: string;
}

export type ChangeHandler = (action: string, value: string) => void;
export type MaxAndMin = (arr: Book[]) => number;

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
  searchValue: string;
  filtersSort: string;
  categorySort: string[];
  authorSort: string[];
  priceRangeMin: number;
  priceRangeMax: number;
  countRangeMin: number;
  countRangeMax: number;
}

export type ChangeHandler = (action: string, value: string) => void;
export type MaxAndMin = (arr: Book[]) => number;

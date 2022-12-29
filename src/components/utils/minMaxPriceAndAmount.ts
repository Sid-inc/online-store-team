import { Book } from '../../interfaces';

export function minPrice(arr: Book[]) {
  return arr.reduce((min: number, current: Book) => {
    if (min === 0) {
      min = current.price;
      return min;
    }
    return min < current.price ? min : current.price;
  }, 0);
}

export function maxPrice(arr: Book[]) {
  return arr.reduce((max: number, current: Book) => {
    return max > current.price ? max : current.price;
  }, 0);
}
export function minAmount(arr: Book[]) {
  return arr.reduce((min: number, current: Book) => {
    if (min === 0) {
      min = current.amount;
      return min;
    }
    return min < current.amount ? min : current.amount;
  }, 0);
}

export function maxAmount(arr: Book[]) {
  return arr.reduce((max: number, current: Book) => {
    return max > current.amount ? max : current.amount;
  }, 0);
}

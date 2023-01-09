import { CartItem } from '../../interfaces';
import { BookStorage } from './storage';

export function сountBooksInCart() {
  const storage = new BookStorage();
  const bookArr = storage.getCurrentBooks();
  console.log(bookArr);
  // const count =
  if (bookArr) {
    const count: number = bookArr.reduce((acc: number, cur: CartItem) => {
      return acc + cur.count;
    }, 0);
    return count.toString();
  } else {
    return '0';
  }
}
export function priceBooksInCart() {
  const storage = new BookStorage();
  const bookArr = storage.getCurrentBooks();
  if (bookArr) {
    const count: number = bookArr.reduce((acc: number, cur: CartItem) => {
      return acc + cur.price * cur.count;
    }, 0);
    return count.toFixed(2);
  } else {
    return '0.00';
  }
}

export function drowInHeaderAmountBooksInCart() {
  const amoumtBookInCart = document.querySelector('.cart__counter') as HTMLElement;
  if (amoumtBookInCart instanceof HTMLElement) {
    const text = сountBooksInCart();
    amoumtBookInCart.innerHTML = text;
  }
}
export function drowInHeaderPriceBooksInCart() {
  const amoumtBookInCart = document.querySelector('.cart__price') as HTMLElement;
  if (amoumtBookInCart instanceof HTMLElement) {
    const text = priceBooksInCart();
    amoumtBookInCart.innerHTML = `Total: $${text}`;
  }
}

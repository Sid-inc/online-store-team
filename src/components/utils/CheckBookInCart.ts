import { Book } from '../../interfaces';
import { BookStorage } from './storage';

export function CheckBookInCart(product: Book) {
  const storage = new BookStorage();
  const booksInCart = storage.getCurrentBooks();
  if (booksInCart) {
    console.log(product.id, booksInCart.findIndex((el) => el.id === product.id) === -1);

    return !(booksInCart.findIndex((el) => el.id === product.id) === -1);
  }
}

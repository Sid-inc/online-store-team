import { Book } from '../../interfaces';
import { BookStorage } from './storage';

export function CheckBookInCart(product: Book) {
  const storage = new BookStorage();
  const booksInCart = storage.getCurrentBooks();
  if (booksInCart) {
    return !(booksInCart.findIndex((el) => el.id === product.id) === -1);
  }
}

import { Book, CartItem } from '../../interfaces';

export class BookStorage {
  private readonly _prefix = 'bstore_';
  private listKey = `${this._prefix}cart_list`;

  addBook(book: Book): void {
    const currentList = this.getCurrentBooks() ?? [];
    if (currentList.find((item) => item.id === book.id)) return;
    const cartItem = {
      id: book.id,
      count: 1,
      price: book.price,
    } as CartItem;
    currentList.push(cartItem);
    localStorage.setItem(this.listKey, JSON.stringify(currentList));
  }

  removeBook(id: number): void {
    const currentList = this.getCurrentBooks() ?? [];
    const removeItemIndex = currentList.findIndex((item) => item.id === id);
    if (removeItemIndex === -1) return;
    currentList.splice(removeItemIndex, 1);
    localStorage.setItem(this.listKey, JSON.stringify(currentList));
  }

  getCurrentBooks(): CartItem[] | void {
    const listItems = localStorage.getItem(this.listKey);
    if (!listItems) return;
    return JSON.parse(listItems) as CartItem[];
  }
}

import { Book } from '../../interfaces';

export class BookStorage {
  private readonly _prefix = 'bstore_';
  private listKey = `${this._prefix}cart_list`;
  private bookList: Book[];

  constructor() {
    this.bookList = [];
  }

  addBook(book: Book): void {
    const currentList = this.getCurrentBooks() ?? [];
    if (currentList.find((item) => item.id === book.id)) return;
    currentList.push(book);
    localStorage.setItem(this.listKey, JSON.stringify(currentList));
  }

  getCurrentBooks(): Book[] | void {
    const listItems = localStorage.getItem(this.listKey);
    if (!listItems) return;
    return JSON.parse(listItems) as Book[];
  }
}

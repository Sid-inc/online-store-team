import { ChangeHandler } from '../../interfaces';
import { books, settingsForSort } from '../constants/constants';
import { getSortValue, searchBooks } from '../utils/sort';
import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
function getBooks() {
  const booksBySearch = searchBooks(books, settingsForSort);
  getSortValue(booksBySearch, settingsForSort);
  console.log(booksBySearch);

  return booksBySearch;
}
export class View {
  header: Header;
  footer: Footer;
  main: Main;
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.main = new Main(this.changeHandler);
  }

  drawApp() {
    this.header.draw();
    const booksForDrow = getBooks();
    this.main.draw(booksForDrow);
    this.footer.draw();
  }
  changeHandler: ChangeHandler = (action, value) => {
    console.log(action, value);
    switch (action) {
      case 'setSearchValue':
        settingsForSort.searchValue = value;
        break;
      case 'addFiltersSort':
        settingsForSort.filtersSort = value;
        break;
      default:
        break;
    }
    const booksForDrow = getBooks();
    this.main.drawCatalogList(booksForDrow);
  };
}

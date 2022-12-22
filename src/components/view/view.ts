import { books } from '../constants/constants';
import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';

export class View {
  header: Header;
  footer: Footer;
  main: Main;
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.main = new Main(books); // передаю хэндлер
  }

  drawApp() {
    this.header.draw();
    //const booksArr = getBooks(books) - функция со всеми сортировками
    this.main.draw(); //передать booksArr
    this.footer.draw();
  }
  // searchHandler = (e) => {
  //   const searchBoks = searchProducts(input, books);
  //   const main = new Main(searchBoks);
  //   main.clear();
  //   main.draw();
  // }
}

import { books } from '../constants/books';
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
    this.main = new Main(books);
  }

  drawApp() {
    this.header.draw();
    this.main.draw();
    this.footer.draw();
  }
}

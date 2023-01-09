import { ChangeHandler } from '../../interfaces';
import { books, settingsForSort } from '../constants/constants';
import { maxAmount, maxPrice, minAmount, minPrice } from '../utils/minMaxPriceAndAmount';
import { cleanSearchParams, searchParams, getSearchParams } from '../utils/searchParams';
import { getBooks } from '../utils/sortingAndFiltering';
import { Cart } from './cart';
import { ErrorPage } from './error-page';
import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
import { Product } from './product';
import { Promo } from './promo';

export class View {
  header: Header;
  footer: Footer;
  main: Main;
  promo: Promo;
  cart: Cart;
  searchInput: HTMLInputElement | null = document.querySelector('.search__field');
  constructor() {
    this.header = new Header('cart');
    this.footer = new Footer();
    this.promo = new Promo();
    this.main = new Main(this.changeHandler);
    this.cart = new Cart('cart');
  }

  drawApp() {
    this.header.draw();
    this.promo.draw();
    getSearchParams();
    this.renderNewPage('');
    this.enableRouteChange();
    this.footer.draw();
  }

  changeHandler: ChangeHandler = (action, value) => {
    switch (action) {
      case 'setSearchValue':
        settingsForSort.search = value;
        searchParams();

        break;
      case 'sort':
        settingsForSort.sort = value;
        searchParams();

        break;
      case 'addcategory':
        if (!settingsForSort.category.includes(value)) {
          settingsForSort.category.push(value);
        } else {
          const index: number = settingsForSort.category.indexOf(value);
          settingsForSort.category.splice(index, 1);
        }
        searchParams();
        break;
      case 'addauthor':
        if (!settingsForSort.author.includes(value)) {
          settingsForSort.author.push(value);
          searchParams();
        } else {
          const index: number = settingsForSort.author.indexOf(value);
          settingsForSort.author.splice(index, 1);
          searchParams();
        }

        break;

      case 'addMinPrice':
        settingsForSort.priceMin = +value.split(';')[0];
        searchParams();
        break;

      case 'addMaxPrice':
        settingsForSort.priceMax = +value.split(';')[1];
        searchParams();
        break;
      case 'addMinAmount':
        settingsForSort.countMin = +value.split(';')[0];
        searchParams();
        break;

      case 'addMaxAmount':
        settingsForSort.countMax = +value.split(';')[1];
        searchParams();
        break;
      case 'cleanSettings':
        if (this.searchInput) {
          this.searchInput.remove();
        }
        settingsForSort.search = '';
        settingsForSort.sort = 'pasc';
        settingsForSort.category = [];
        settingsForSort.author = [];
        settingsForSort.priceMin = minPrice(books);
        settingsForSort.priceMax = maxPrice(books);
        settingsForSort.countMin = minAmount(books);
        settingsForSort.countMax = maxAmount(books);
        cleanSearchParams();
      default:
        break;
    }
    this.renderNewPage('');
  };

  renderNewPage(idPage: string) {
    const currentPage = document.querySelector('main');
    if (currentPage) {
      currentPage.remove();
    }
    let page: Main | Cart | Product | ErrorPage | null = null;
    if (idPage === '') {
      page = this.main;
      const booksForDrow = getBooks(books, settingsForSort);
      page.drawSearhAndSortContainer();
      page.drawCatalog(booksForDrow);
    } else if (idPage === 'cart') {
      page = new Cart('cart');
      page.draw();
    } else if (idPage === `book${idPage.slice(4)}`) {
      page = new Product(books);
      const footer = document.querySelector('footer') as HTMLElement;
      if (!footer) {
        document.body.append(page.draw());
      } else {
        footer.before(page.draw());
      }
    } else {
      page = new ErrorPage();
      const footer = document.querySelector('footer') as HTMLElement;
      if (!footer) {
        document.body.append(page.draw());
      } else {
        footer.before(page.draw());
      }
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });
  }
}

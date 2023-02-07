import { ChangeHandler } from '../../interfaces';
import { BOOKS_ON_SALE, SETTINGS_FOR_SORT } from '../constants/constants';
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
    this.renderNewPage(window.location.hash.slice(1) || '');
    this.enableRouteChange();
    this.footer.draw();
  }

  changeHandler: ChangeHandler = (action, value) => {
    switch (action) {
      case 'setSearchValue':
        SETTINGS_FOR_SORT.search = value;
        searchParams();

        break;
      case 'sort':
        SETTINGS_FOR_SORT.sort = value;
        searchParams();

        break;
      case 'addcategory':
        if (!SETTINGS_FOR_SORT.category.includes(value)) {
          SETTINGS_FOR_SORT.category.push(value);
        } else {
          const index: number = SETTINGS_FOR_SORT.category.indexOf(value);
          SETTINGS_FOR_SORT.category.splice(index, 1);
        }
        searchParams();
        break;
      case 'addauthor':
        if (!SETTINGS_FOR_SORT.author.includes(value)) {
          SETTINGS_FOR_SORT.author.push(value);
          searchParams();
        } else {
          const index: number = SETTINGS_FOR_SORT.author.indexOf(value);
          SETTINGS_FOR_SORT.author.splice(index, 1);
          searchParams();
        }

        break;

      case 'addMinPrice':
        SETTINGS_FOR_SORT.priceMin = +value.split(';')[0];
        searchParams();
        break;

      case 'addMaxPrice':
        SETTINGS_FOR_SORT.priceMax = +value.split(';')[1];
        searchParams();
        break;
      case 'addMinAmount':
        SETTINGS_FOR_SORT.countMin = +value.split(';')[0];
        searchParams();
        break;

      case 'addMaxAmount':
        SETTINGS_FOR_SORT.countMax = +value.split(';')[1];
        searchParams();
        break;
      case 'cleanSettings':
        if (this.searchInput) {
          this.searchInput.remove();
        }
        SETTINGS_FOR_SORT.search = '';
        SETTINGS_FOR_SORT.sort = 'pasc';
        SETTINGS_FOR_SORT.category = [];
        SETTINGS_FOR_SORT.author = [];
        SETTINGS_FOR_SORT.priceMin = minPrice(BOOKS_ON_SALE);
        SETTINGS_FOR_SORT.priceMax = maxPrice(BOOKS_ON_SALE);
        SETTINGS_FOR_SORT.countMin = minAmount(BOOKS_ON_SALE);
        SETTINGS_FOR_SORT.countMax = maxAmount(BOOKS_ON_SALE);
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
      const booksForDrow = getBooks(BOOKS_ON_SALE, SETTINGS_FOR_SORT);
      page.drawSearhAndSortContainer();
      page.drawCatalog(booksForDrow);
    } else if (idPage === 'cart') {
      page = new Cart('cart');
      page.draw();
    } else if (idPage === `book${idPage.slice(4)}`) {
      page = new Product(BOOKS_ON_SALE);
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

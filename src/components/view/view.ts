import { ChangeHandler } from '../../interfaces';
import { books, settingsForSort } from '../constants/constants';
import { maxAmount, maxPrice, minAmount, minPrice } from '../utils/minMaxPriceAndAmount';
import { cleanSearchParams, getSearchParams, searchParams } from '../utils/searchParams';
import { getBooks } from '../utils/sortingAndFiltering';
import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
import { Promo } from './promo';

export class View {
  header: Header;
  footer: Footer;
  main: Main;
  promo: Promo;
  searchInput: HTMLInputElement | null = document.querySelector('.search__field');
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.promo = new Promo();
    this.main = new Main(this.changeHandler);
  }

  drawApp() {
    this.header.draw();
    this.promo.draw();
    getSearchParams();
    const booksForDrow = getBooks(books, settingsForSort);
    this.main.draw();
    this.main.drawCatalog(booksForDrow);
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
        } else {
          const index: number = settingsForSort.author.indexOf(value);
          settingsForSort.author.splice(index, 1);
        }
        searchParams();

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
        console.log(this.searchInput);

        if (this.searchInput) {
          this.searchInput.remove();
        }
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
    const booksForDrow = getBooks(books, settingsForSort);
    this.main.drawCatalog(booksForDrow);
  };
}

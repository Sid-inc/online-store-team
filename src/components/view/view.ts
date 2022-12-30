import { ChangeHandler } from '../../interfaces';
import { books, settingsForSort } from '../constants/constants';
import { maxAmount, maxPrice, minAmount, minPrice } from '../utils/minMaxPriceAndAmount';
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
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.promo = new Promo();
    this.main = new Main(this.changeHandler);
  }

  drawApp() {
    this.header.draw();
    this.promo.draw();
    const booksForDrow = getBooks(books, settingsForSort);
    this.main.draw();
    this.main.drawCatalog(booksForDrow);
    this.footer.draw();
  }
  changeHandler: ChangeHandler = (action, value) => {
    switch (action) {
      case 'setSearchValue':
        settingsForSort.searchValue = value;
        break;
      case 'addFiltersSort':
        settingsForSort.filtersSort = value;
        break;
      case 'addcategory':
        if (!settingsForSort.categorySort.includes(value)) {
          settingsForSort.categorySort.push(value);
        } else {
          const index: number = settingsForSort.categorySort.indexOf(value);
          settingsForSort.categorySort.splice(index, 1);
        }

        break;
      case 'addauthor':
        if (!settingsForSort.authorSort.includes(value)) {
          settingsForSort.authorSort.push(value);
        } else {
          const index: number = settingsForSort.authorSort.indexOf(value);
          settingsForSort.authorSort.splice(index, 1);
        }
        break;

      case 'addMinPrice':
        settingsForSort.priceRangeMin = +value.split(';')[0];
        break;

      case 'addMaxPrice':
        settingsForSort.priceRangeMax = +value.split(';')[1];
        break;
      case 'addMinAmount':
        settingsForSort.countRangeMin = +value.split(';')[0];
        break;

      case 'addMaxAmount':
        settingsForSort.countRangeMax = +value.split(';')[1];
        break;
      case 'cleanSettings':
        settingsForSort.categorySort = [];
        settingsForSort.authorSort = [];
        settingsForSort.priceRangeMin = minPrice(books);
        settingsForSort.priceRangeMax = maxPrice(books);
        settingsForSort.countRangeMin = minAmount(books);
        settingsForSort.countRangeMax = maxAmount(books);
      default:
        break;
    }
    const booksForDrow = getBooks(books, settingsForSort);
    console.log(settingsForSort);

    this.main.drawCatalog(booksForDrow);
  };
}

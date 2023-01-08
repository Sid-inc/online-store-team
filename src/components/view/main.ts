import { Book, ChangeHandler } from '../../interfaces';
import { books, settingsForSort } from '../constants/constants';
import { copyLink } from '../utils/copyLink';
import { createNode } from '../utils/createNode';
import { maxAmount, maxPrice, minAmount, minPrice } from '../utils/minMaxPriceAndAmount';
import { getBooks } from '../utils/sortingAndFiltering';
import { Card } from './card';
import { FilterList } from './filterList';
import { Search } from './search';
import { Slider } from './slider';
import { Sort } from './sort';

export class Main {
  main = createNode({ tag: 'main', classes: ['catalog'], atributesAndValues: [['id', 'shop']] });
  searhAndSortContainer: HTMLElement | null = null;
  catalogList: HTMLElement | null = null;
  catalogContainer: HTMLElement | null = null;
  filterListByCategories: FilterList;
  filterListByAuthors: FilterList;
  changeHandler: ChangeHandler;

  constructor(changeHandler: ChangeHandler) {
    this.changeHandler = changeHandler;
    this.filterListByCategories = new FilterList(books, 'category', changeHandler, settingsForSort);
    this.filterListByAuthors = new FilterList(books, 'author', changeHandler, settingsForSort);
  }

  drawSearhAndSortContainer() {
    if (this.searhAndSortContainer) {
      this.searhAndSortContainer.remove();
    }
    this.searhAndSortContainer = createNode({
      tag: 'div',
      classes: ['catalog__inner', 'container'],
      parent: this.main,
    });
    const search = new Search(this.changeHandler);
    const sort = new Sort(this.changeHandler, settingsForSort);
    this.searhAndSortContainer.append(search.drow(), sort.drow());
    const input = document.querySelector('.search__field');
    if (input instanceof HTMLInputElement) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
    const viewButtons = createNode({
      tag: 'div',
      classes: ['view-buttons'],
      parent: this.searhAndSortContainer,
    });
    const shortView = createNode({
      tag: 'button',
      classes: ['view-button', 'view-buttons-active'],
      text: 'short view',
      parent: viewButtons,
    });
    const fullView = createNode({ tag: 'button', classes: ['view-button'], text: 'full view', parent: viewButtons });
    viewButtons.addEventListener('click', (e) => {
      if (e.target instanceof HTMLElement) {
        if (e.target === shortView) {
          if (this.catalogList) {
            shortView.classList.add('view-buttons-active');
            fullView.classList.remove('view-buttons-active');
            this.catalogList.classList.add('product__list_short');
          }
        } else {
          if (this.catalogList) {
            shortView.classList.remove('view-buttons-active');
            fullView.classList.add('view-buttons-active');
            this.catalogList.classList.remove('product__list_short');
          }
        }
      }
    });
  }

  drawCatalog(products: Book[]) {
    if (this.catalogContainer) {
      this.catalogContainer.remove();
    }
    this.catalogContainer = createNode({ tag: 'div', classes: ['catalog__inner', 'container'], parent: this.main });
    this.catalogContainer.append(this.drawCatalogFilters(), this.drawCatalogList(products));
    const footer = document.querySelector('footer') as HTMLElement;
    if (!footer) {
      document.body.append(this.main);
    } else {
      footer.before(this.main);
    }
  }

  drawCatalogFilters() {
    const catalogFilters = createNode({ tag: 'aside', classes: ['catalog__filters', 'filters'] });
    const form = createNode({ tag: 'form', classes: ['filters__inner'], parent: catalogFilters });
    const searchText = createNode({
      tag: 'span',
      classes: ['search__text'],
      text: `${getBooks(books, settingsForSort).length} books found`,
    });
    form.append(searchText, this.filterListByCategories.drow(), this.filterListByAuthors.drow());

    const filtersRanges = createNode({ tag: 'fieldset', classes: ['filters__ranges'], parent: form });
    const rangePriceTitle = createNode({
      tag: 'div',
      classes: ['range__title'],
      text: 'Price range',
    });
    const rangePrice = new Slider(minPrice, maxPrice, books, 0.01, 'priceMin', 'priceMax', this.changeHandler, 'Price');
    const rangeAmountTitle = createNode({
      tag: 'div',
      classes: ['range__title'],
      text: 'Amount in shop range',
    });
    const rangeAmount = new Slider(
      minAmount,
      maxAmount,
      books,
      1,
      'countMin',
      'countMax',
      this.changeHandler,
      'Amount'
    );

    filtersRanges.append(rangePriceTitle, rangePrice.drawSlider(2), rangeAmountTitle, rangeAmount.drawSlider(0));

    const filtersFooter = createNode({ tag: 'footer', classes: ['filters__footer'], parent: form });
    const buttonClean = createNode({
      tag: 'button',
      classes: ['button', 'button--primary'],
      text: 'Clean',
      atributesAndValues: [['type', 'button']],
      parent: filtersFooter,
    });
    const buttonCopy = createNode({
      tag: 'button',
      classes: ['button'],
      text: 'Copy',
      atributesAndValues: [['type', 'button']],
      parent: filtersFooter,
    });
    buttonClean.addEventListener('click', () => {
      this.changeHandler('cleanSettings', '');
    });
    buttonCopy.addEventListener('click', () => {
      copyLink();
      buttonCopy.innerText = 'Copied!';
    });

    return catalogFilters;
  }

  drawCatalogList(products: Book[]) {
    if (this.catalogList) {
      this.catalogList.remove();
    }
    this.catalogList = createNode({ tag: 'ul', classes: ['catalog__list', 'product-list'] });
    if (products.length !== 0) {
      products.forEach((product) => {
        const card = new Card(product);
        if (this.catalogList) {
          this.catalogList.append(card.getCardElement());
        }
      });
    } else {
      this.catalogList.classList.add('product__list_no-found');
      createNode({
        tag: 'span',
        classes: ['catalog__list_text'],
        text: 'No books found... <br> Please, change your search settings.',
        parent: this.catalogList,
      });
    }

    return this.catalogList;
  }
}

import { Book, ChangeHandler } from '../../interfaces';
import { books, settingsForSort } from '../constants/constants';
import { createNode } from '../utils/createNode';
import { maxAmount, maxPrice, minAmount, minPrice } from '../utils/minMaxPriceAndAmount';
import { Card } from './card';
import { FilterList } from './filterList';
import { Search } from './search';
import { Sort } from './sort';

export class Main {
  main = createNode({ tag: 'main', classes: ['catalog'], atributesAndValues: [['id', 'shop']] });
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

  draw() {
    const searhAndSortContainer = createNode({
      tag: 'div',
      classes: ['catalog__inner', 'container'],
      parent: this.main,
    });
    const search = new Search(this.changeHandler);
    const sort = new Sort(this.changeHandler);
    searhAndSortContainer.append(search.drow(), sort.drow());
  }

  drawCataog(products: Book[]) {
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

    form.append(this.filterListByCategories.drow(), this.filterListByAuthors.drow());

    const filtersRanges = createNode({ tag: 'fieldset', classes: ['filters__ranges'], parent: form });

    const rangePrice = createNode({ tag: 'div', classes: ['range'], parent: filtersRanges });
    createNode({
      tag: 'label',
      classes: ['range__title'],
      atributesAndValues: [['for', 'price']],
      text: 'Price range',
      parent: rangePrice,
    });
    createNode({
      tag: 'input',
      classes: ['range__selector'],
      atributesAndValues: [
        ['id', 'price'],
        ['type', 'range'],
      ],
      parent: rangePrice,
    });
    const rangePriceValues = createNode({ tag: 'span', classes: ['range__values'], parent: rangePrice });
    createNode({
      tag: 'span',
      classes: ['range__min'],
      text: `$${minPrice(books).toFixed(2)}`,
      parent: rangePriceValues,
    });
    createNode({
      tag: 'span',
      classes: ['range__max'],
      text: `$${maxPrice(books).toFixed(2)}`,
      parent: rangePriceValues,
    });

    const rangeAmount = createNode({ tag: 'div', classes: ['range'], parent: filtersRanges });
    createNode({
      tag: 'label',
      classes: ['range__title'],
      atributesAndValues: [['for', 'count']],
      text: 'Amount in shop range',
      parent: rangeAmount,
    });
    createNode({
      tag: 'input',
      classes: ['range__selector'],
      atributesAndValues: [
        ['id', 'count'],
        ['type', 'range'],
      ],
      parent: rangeAmount,
    });
    const rangeAmountValues = createNode({ tag: 'span', classes: ['range__values'], parent: rangeAmount });
    createNode({ tag: 'span', classes: ['range__min'], text: minAmount(books).toString(), parent: rangeAmountValues });
    createNode({ tag: 'span', classes: ['range__max'], text: maxAmount(books).toString(), parent: rangeAmountValues });

    const filtersFooter = createNode({ tag: 'footer', classes: ['filters__footer'], parent: form });
    createNode({
      tag: 'button',
      classes: ['button', 'button--primary'],
      text: 'Clean',
      atributesAndValues: [['type', 'button']],
      parent: filtersFooter,
    });
    createNode({
      tag: 'button',
      classes: ['button'],
      text: 'Copy',
      atributesAndValues: [['type', 'button']],
      parent: filtersFooter,
    });

    return catalogFilters;
  }

  drawCatalogList(products: Book[]) {
    if (this.catalogList) {
      this.catalogList.remove();
    }
    this.catalogList = createNode({ tag: 'ul', classes: ['catalog__list', 'product-list'] });
    products.forEach((product) => {
      const card = new Card(product);
      if (this.catalogList) {
        this.catalogList.append(card.getCardElement());
      }
    });
    return this.catalogList;
  }
}

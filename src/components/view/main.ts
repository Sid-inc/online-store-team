import { Book } from '../../interfaces';
import { books } from '../constants/constants';
// import { countKeys } from '../utils/countDescription';
import { createNode } from '../utils/createNode';
import { maxAmount, maxPrice, minAmount, minPrice } from '../utils/minMaxPriceAndAmount';
import { Card } from './card';
import { FilterList } from './filetrList';
import { Search } from './search';
import { Sort } from './sort';

export class Main {
  products: Book[];
  search: Search;
  sort: Sort;
  filterListByCategories: FilterList;
  filterListByAuthors: FilterList;
  // filterListByCategories: FilterList;
  constructor(products: Book[]) {
    this.products = products;
    this.search = new Search();
    this.sort = new Sort();
    this.filterListByCategories = new FilterList(books, 'category');
    this.filterListByAuthors = new FilterList(books, 'author');
    // this.filterListByCategories = new FileList(books);
    // this.prop = 2;
  }

  draw() {
    const main = createNode({ tag: 'main', classes: ['catalog'], atributesAndValues: [['id', 'shop']] });
    const catalogContainer = createNode({ tag: 'div', classes: ['catalog__inner', 'container'], parent: main });
    catalogContainer.append(this.drawCatalogFilters(), this.drawCatalogList());
    document.body.append(main);
    const promo = createNode({ tag: 'div', classes: ['promo'] });
    const promoContainer = createNode({ tag: 'div', classes: ['promo__inner', 'container'], parent: promo });
    createNode({
      tag: 'a',
      classes: ['promo__link'],
      atributesAndValues: [['href', '#shop']],
      text: 'Shop now',
      parent: promoContainer,
    });
    main.before(promo);
  }
  drawCatalogFilters() {
    const catalogFilters = createNode({ tag: 'aside', classes: ['catalog__filters', 'filters'] });
    const form = createNode({ tag: 'form', classes: ['filters__inner'], parent: catalogFilters });
    form.append(
      this.search.drow(),
      this.sort.drow(),
      this.filterListByCategories.drow(),
      this.filterListByAuthors.drow()
    );

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
      text: 'Cope',
      atributesAndValues: [['type', 'button']],
      parent: filtersFooter,
    });

    return catalogFilters;
  }

  drawCatalogList() {
    const catalogList = createNode({ tag: 'ul', classes: ['catalog__list', 'product-list'] });
    this.products.forEach((product) => {
      const card = new Card(product);
      catalogList.append(card.getCardElement());
    });
    console.log(catalogList);
    return catalogList;
  }
  clear() {
    const main = document.querySelector('#shop') as HTMLElement;
    main.innerHTML = '';
  }
}

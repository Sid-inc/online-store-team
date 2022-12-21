import { Book } from '../../interfaces';
import { books } from '../constants/books';
import { countKeys } from '../utils/countDescription';
import { createNode } from '../utils/createNode';
import { Card } from './card';

export class Main {
  products: Book[];
  constructor(products: Book[]) {
    this.products = products;
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
    const search = createNode({ tag: 'div', classes: ['filters__search', 'search'], parent: form });
    const searchInput = createNode({
      tag: 'input',
      classes: ['search__field'],
      atributesAndValues: [
        ['type', 'text'],
        ['placeholder', 'Search'],
      ],
    });
    const searchButton = createNode({
      tag: 'button',
      classes: ['search__action'],
      atributesAndValues: [
        ['type', 'button'],
        ['aria-label', 'clean'],
      ],
    });
    const searchText = createNode({ tag: 'span', classes: ['search__text'], text: '0 products found' });
    search.append(searchInput, searchButton, searchText);

    const sort = createNode({ tag: 'select', classes: ['filters__sort', 'sort'], parent: form });
    const optionPasc = createNode({
      tag: 'option',
      classes: ['sort__item'],
      atributesAndValues: [['value', 'pasc']],
      text: 'Price asc',
    }) as HTMLInputElement;
    const optionRasc = createNode({
      tag: 'option',
      classes: ['sort__item'],
      atributesAndValues: [['value', 'rasc']],
      text: 'Rating asc',
    });
    const optionRdsc = createNode({
      tag: 'option',
      classes: ['sort__item'],
      atributesAndValues: [['value', 'rdsc']],
      text: 'Rating dsc',
    });
    sort.append(optionPasc, optionRasc, optionRdsc, optionRdsc);

    const filtersCategory = createNode({ tag: 'fieldset', classes: ['filters__category', 'categories'], parent: form });
    createNode({
      tag: 'legend',
      classes: ['categories__title'],
      text: 'Category',
      parent: filtersCategory,
    });
    const categoriesList = createNode({
      tag: 'ul',
      classes: ['categories__list', 'categories-list'],
      parent: filtersCategory,
    });
    const arrCategories: [string, number][] = Object.entries(countKeys(books, 'category')).sort((a, b) => b[1] - a[1]);
    arrCategories.forEach((category) => {
      const li = createNode({ tag: 'li', classes: ['categories-list__item', 'categories-item'] });
      const button = createNode({
        tag: 'button',
        classes: ['categories-item__action', 'categories-item__action--disabled'],
        atributesAndValues: [['type', 'button']],
        parent: li,
      });
      createNode({ tag: 'span', classes: ['categories-item__name'], text: category[0], parent: button });
      createNode({ tag: 'span', classes: ['categories-item__count'], text: `(${category[1]})`, parent: button });
      categoriesList.append(li);
    });

    const filtersAuthors = createNode({ tag: 'fieldset', classes: ['filters__author', 'categories'], parent: form });
    createNode({
      tag: 'legend',
      classes: ['categories__title'],
      text: 'Author',
      parent: filtersAuthors,
    });
    const authorsList = createNode({
      tag: 'ul',
      classes: ['categories__list', 'categories-list'],
      parent: filtersAuthors,
    });
    const arrAuthors: [string, number][] = Object.entries(countKeys(books, 'author')).sort((a, b) => b[1] - a[1]);
    arrAuthors.forEach((category) => {
      const li = createNode({ tag: 'li', classes: ['categories-list__item', 'categories-item'] });
      const button = createNode({
        tag: 'button',
        classes: ['categories-item__action', 'categories-item__action--disabled'],
        atributesAndValues: [['type', 'button']],
        parent: li,
      });
      createNode({ tag: 'span', classes: ['categories-item__name'], text: category[0], parent: button });
      createNode({ tag: 'span', classes: ['categories-item__count'], text: `(${category[1]})`, parent: button });
      authorsList.append(li);
    });

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
    createNode({ tag: 'span', classes: ['range__min'], text: '0', parent: rangePriceValues });
    createNode({ tag: 'span', classes: ['range__max'], text: '100', parent: rangePriceValues });

    const rangeCount = createNode({ tag: 'div', classes: ['range'], parent: filtersRanges });
    createNode({
      tag: 'label',
      classes: ['range__title'],
      atributesAndValues: [['for', 'count']],
      text: 'Count range',
      parent: rangeCount,
    });
    createNode({
      tag: 'input',
      classes: ['range__selector'],
      atributesAndValues: [
        ['id', 'count'],
        ['type', 'range'],
      ],
      parent: rangeCount,
    });
    const rangeCountValues = createNode({ tag: 'span', classes: ['range__values'], parent: rangeCount });
    createNode({ tag: 'span', classes: ['range__min'], text: '0', parent: rangeCountValues });
    createNode({ tag: 'span', classes: ['range__max'], text: '100', parent: rangeCountValues });

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
    return catalogList;
  }
}

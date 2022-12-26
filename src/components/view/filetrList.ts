import { Book } from '../../interfaces';
import { createNode } from '../utils/createNode';
import { countKeys } from '../utils/countDescription';

export class FilterList {
  product: Book[];
  key: keyof Pick<Book, 'author' | 'category'>;

  constructor(product: Book[], key: keyof Pick<Book, 'author' | 'category'>) {
    this.product = product;
    this.key = key;
  }

  drow() {
    const filtersCategory = createNode({ tag: 'fieldset', classes: ['filters__category', 'categories'] });
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
    const arrCategories: [string, number][] = Object.entries(countKeys(this.product, this.key)).sort(
      (a, b) => b[1] - a[1]
    );
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
    return filtersCategory;
  }
}

import { Book } from '../../interfaces';
import { createNode } from '../utils/createNode';
import { countKeys } from '../utils/countDescription';
import { books, settingsForSort } from '../constants/constants';
import { getBooks } from '../utils/sort';

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
      text: this.key,
      classes: ['categories__title'],
      parent: filtersCategory,
    });
    const categoriesList = createNode({
      tag: 'ul',
      classes: ['categories__list', 'categories-list'],
      parent: filtersCategory,
    });
    const arrCategories = Object.entries(countKeys(this.product, this.key)).sort((a, b) => b[1] - a[1]);
    arrCategories.forEach((category) => {
      const li = createNode({ tag: 'li', classes: ['categories-list__item', 'categories-item'] });
      const button = createNode({
        tag: 'button',
        classes: ['categories-item__action', 'categories-item__action--disabled'],
        atributesAndValues: [
          ['type', 'button'],
          ['id', category[0]],
        ],
        parent: li,
      });

      createNode({ tag: 'span', classes: ['categories-item__name'], text: category[0], parent: button });
      createNode({ tag: 'span', classes: ['categories-item__count'], text: `(${category[1]})`, parent: button });
      button.addEventListener('click', () => {
        const category = button.childNodes[0].textContent as string;
        if (!settingsForSort[`${this.key}Sort`].includes(category)) {
          settingsForSort[`${this.key}Sort`].push(category);
          return getBooks(books, settingsForSort);
        } else {
          const index: number = settingsForSort[`${this.key}Sort`].indexOf(category);
          settingsForSort[`${this.key}Sort`].splice(index, 1);
        }

        console.log(settingsForSort);
      });
      categoriesList.append(li);
    });
    return filtersCategory;
  }
}

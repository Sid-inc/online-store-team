import { Book, ChangeHandler, SettingsForSort } from '../../interfaces';
import { createNode } from '../utils/createNode';
import { countKeys } from '../utils/countDescription';
import { toggleActiveClass } from '../utils/toggleActiveClass';
import { getBooks } from '../utils/sortingAndFiltering';
import { BOOKS_ON_SALE, SETTINGS_FOR_SORT } from '../constants/constants';

export class FilterList {
  product: Book[];
  key: keyof Pick<Book, 'author' | 'category'>;
  changeHandler: ChangeHandler;
  settings: SettingsForSort;

  constructor(
    product: Book[],
    key: keyof Pick<Book, 'author' | 'category'>,
    changeHandler: ChangeHandler,
    settings: SettingsForSort
  ) {
    this.product = product;
    this.key = key;
    this.changeHandler = changeHandler;
    this.settings = settings;
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

      const span = createNode({ tag: 'span', classes: ['categories-item__name'], text: category[0], parent: button });
      createNode({
        tag: 'span',
        classes: ['categories-item__count'],
        text: `(${getBooks(BOOKS_ON_SALE, SETTINGS_FOR_SORT).filter((book) => book[this.key] === category[0]).length}/${
          category[1]
        })`,
        parent: button,
      });
      if (this.settings[this.key].includes(span.innerText)) {
        button.classList.add('categories-item__action--active');
      }
      button.addEventListener('click', () => {
        this.changeHandler(`add${this.key}`, button.childNodes[0].textContent as string);
        toggleActiveClass(button);
      });
      categoriesList.append(li);
    });
    return filtersCategory;
  }
}

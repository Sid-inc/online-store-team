// import { settingsForSort } from '../constants/constants';
import { ChangeHandler } from '../../interfaces';
import { createNode } from '../utils/createNode';
// import { getBooks } from '../utils/sort';

export class Search {
  changeHandler: ChangeHandler;
  constructor(changeHandler: ChangeHandler) {
    this.changeHandler = changeHandler;
  }

  drow() {
    const search = createNode({ tag: 'div', classes: ['filters__search', 'search'] });
    const searchInput = createNode({
      tag: 'input',
      classes: ['search__field'],
      atributesAndValues: [
        ['type', 'text'],
        ['placeholder', 'Search'],
      ],
    }) as HTMLInputElement;
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
    searchInput.addEventListener('input', () => {
      this.changeHandler('setSearchValue', searchInput.value);
    });
    searchButton.addEventListener('click', () => {
      searchInput.value = '';
      this.changeHandler('setSearchValue', '');
    });
    return search;
  }
}

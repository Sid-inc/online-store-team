import { ChangeHandler } from '../../interfaces';
import { settingsForSort } from '../constants/constants';
import { createNode } from '../utils/createNode';

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
        ['value', settingsForSort.searchValue],
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
    searchInput.focus();
    search.append(searchInput, searchButton);
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

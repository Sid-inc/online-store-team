import { settingsForSort } from '../constants/constants';
import { createNode } from '../utils/createNode';

export class Search {
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
      settingsForSort.searchValue = searchInput.value;
      console.log(settingsForSort);
    });
    return search;
  }

  // sort(input: HTMLInputElement, arr: Book[]): Book[] {
  //   return getBooksForCreateCatalog(input, arr);
  // }
}

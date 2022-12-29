import { ChangeHandler } from '../../interfaces';
import { settingsForSort } from '../constants/constants';
import { createNode } from '../utils/createNode';

export class Sort {
  changeHandler: ChangeHandler;
  constructor(changeHandler: ChangeHandler) {
    this.changeHandler = changeHandler;
  }
  drow() {
    const sort = createNode({ tag: 'select', classes: ['filters__sort', 'sort'] }) as HTMLSelectElement;
    const optionPasc = createNode({
      tag: 'option',
      classes: ['sort__item'],
      atributesAndValues: [['value', 'pasc']],
      text: 'Price asc',
    });
    const optionPdsc = createNode({
      tag: 'option',
      classes: ['sort__item'],
      atributesAndValues: [['value', 'pdsc']],
      text: 'Price dsc',
    });
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
    const options = document.querySelectorAll('option');
    options.forEach((option) => {
      if (option.id === settingsForSort.filtersSort) {
        console.log(`option.id - ${option.id};`);

        option.selected = true;
        sort.prepend(option);
      } else {
        option.selected = false;
        sort.append(option);
      }
    });
    sort.append(optionPasc, optionPdsc, optionRasc, optionRdsc);
    sort.addEventListener('change', () => {
      this.changeHandler('addFiltersSort', sort.value);
    });
    return sort;
  }
}

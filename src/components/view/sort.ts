import { settingsForSort } from '../constants/constants';
import { createNode } from '../utils/createNode';

export class Sort {
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
    sort.append(optionPasc, optionPdsc, optionRasc, optionRdsc);
    sort.addEventListener('change', () => {
      settingsForSort.filtersSort = sort.value;
      console.log(settingsForSort);
    });
    return sort;
  }
}

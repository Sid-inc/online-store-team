import { ChangeHandler, SettingsForSort } from '../../interfaces';
import { createNode } from '../utils/createNode';

export class Sort {
  changeHandler: ChangeHandler;
  settings: SettingsForSort;
  constructor(changeHandler: ChangeHandler, settings: SettingsForSort) {
    this.changeHandler = changeHandler;
    this.settings = settings;
  }
  drow() {
    const sort = createNode({ tag: 'select', classes: ['filters__sort', 'sort'] }) as HTMLSelectElement;
    const optionPasc = createNode({
      tag: 'option',
      classes: ['sort__item'],
      atributesAndValues: [['value', 'pasc']],
      text: 'Price asc',
    });
    if (optionPasc instanceof HTMLOptionElement) {
      if (optionPasc.value === this.settings.sort) {
        optionPasc.selected = true;
      }
    }
    const optionPdsc = createNode({
      tag: 'option',
      classes: ['sort__item'],
      atributesAndValues: [['value', 'pdsc']],
      text: 'Price dsc',
    });
    if (optionPdsc instanceof HTMLOptionElement) {
      if (optionPdsc.value === this.settings.sort) {
        optionPdsc.selected = true;
      }
    }
    const optionRasc = createNode({
      tag: 'option',
      classes: ['sort__item'],
      atributesAndValues: [['value', 'rasc']],
      text: 'Rating asc',
    });
    if (optionRasc instanceof HTMLOptionElement) {
      if (optionRasc.value === this.settings.sort) {
        optionRasc.selected = true;
      }
    }
    const optionRdsc = createNode({
      tag: 'option',
      classes: ['sort__item'],
      atributesAndValues: [['value', 'rdsc']],
      text: 'Rating dsc',
    });
    if (optionRdsc instanceof HTMLOptionElement) {
      if (optionRdsc.value === this.settings.sort) {
        optionRdsc.selected = true;
      }
    }

    sort.append(optionPasc, optionPdsc, optionRasc, optionRdsc);

    sort.addEventListener('change', () => {
      this.changeHandler('sort', sort.value);
    });
    return sort;
  }
}

import { settingsForPagination } from './../constants/constants';
import { ChangeHandler } from '../../interfaces';
import { createNode } from '../utils/createNode';

export class PerPage {
  changeHandler: ChangeHandler;
  constructor(changeHandler: ChangeHandler) {
    this.changeHandler = changeHandler;
  }

  draw() {
    const perPageInput = createNode({
      tag: 'input',
      classes: ['list-actions__limit', 'field'],
      atributesAndValues: [
        ['type', 'number'],
        ['min', `${settingsForPagination.perPageMin}`],
        ['max', `${settingsForPagination.perPageMax}`],
        ['value', `${settingsForPagination.perPage}`],
      ],
    }) as HTMLInputElement;
    perPageInput.addEventListener('input', () => {
      if (+perPageInput.value > settingsForPagination.perPageMax) {
        perPageInput.value = `${settingsForPagination.perPageMax}`;
      }
      if (+perPageInput.value < settingsForPagination.perPageMin) {
        perPageInput.value = `${settingsForPagination.perPageMin}`;
      }
      this.changeHandler('changePerPage', perPageInput.value);
    });
    return perPageInput;
  }
}

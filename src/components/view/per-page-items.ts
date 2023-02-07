import { SETTINGS_FOR_PAGINATION } from './../constants/constants';
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
        ['min', `${SETTINGS_FOR_PAGINATION.perPageMin}`],
        ['max', `${SETTINGS_FOR_PAGINATION.perPageMax}`],
        ['value', `${SETTINGS_FOR_PAGINATION.perPage}`],
      ],
    }) as HTMLInputElement;
    perPageInput.addEventListener('input', () => {
      if (+perPageInput.value > SETTINGS_FOR_PAGINATION.perPageMax) {
        perPageInput.value = `${SETTINGS_FOR_PAGINATION.perPageMax}`;
      }
      if (+perPageInput.value < SETTINGS_FOR_PAGINATION.perPageMin) {
        perPageInput.value = `${SETTINGS_FOR_PAGINATION.perPageMin}`;
      }
      this.changeHandler('changePerPage', perPageInput.value);
    });
    return perPageInput;
  }
}

import { settingsForPagination } from './../constants/constants';
import { ChangeHandler } from '../../interfaces';
import { createNode } from '../utils/createNode';

export class PageNav {
  changeHandler: ChangeHandler;
  constructor(changeHandler: ChangeHandler) {
    this.changeHandler = changeHandler;
  }

  draw() {
    const cartPages = createNode({ tag: 'div', classes: ['list-actions__pages', 'pages'] });
    const prevBtn = createNode({
      tag: 'button',
      classes: ['pages__action', 'pages__action--left', 'button'],
      atributesAndValues: [
        ['type', 'button'],
        ['aria-label', 'Prev page'],
      ],
      parent: cartPages,
    });
    const pageCounter = createNode({
      tag: 'span',
      classes: ['pages__count'],
      text: `${settingsForPagination.currentPage}`,
      parent: cartPages,
    });
    const nextBtn = createNode({
      tag: 'button',
      classes: ['pages__action', 'pages__action--right', 'button'],
      atributesAndValues: [
        ['type', 'button'],
        ['aria-label', 'Next page'],
      ],
      parent: cartPages,
    });

    prevBtn.addEventListener('click', () => {
      if (settingsForPagination.currentPage <= 1) return;
      const newPage = settingsForPagination.currentPage - 1;
      pageCounter.textContent = `${newPage}`;
      this.changeHandler('changeCurrentPage', `${newPage}`);
    });
    nextBtn.addEventListener('click', () => {
      if (settingsForPagination.currentPage >= settingsForPagination.pagesCount) return;
      const newPage = settingsForPagination.currentPage + 1;
      pageCounter.textContent = `${newPage}`;
      this.changeHandler('changeCurrentPage', `${newPage}`);
    });
    return cartPages;
  }
}

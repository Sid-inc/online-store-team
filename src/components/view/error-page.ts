import { createNode } from '../utils/createNode';

export class ErrorPage {
  draw() {
    const main = createNode({ tag: 'main', classes: ['error-page'] });
    const ErrorPageInner = createNode({ tag: 'div', classes: ['error-page__inner'], parent: main });
    createNode({ tag: 'h2', classes: ['error-page__title'], text: '404', parent: ErrorPageInner });
    createNode({ tag: 'span', classes: ['error-page__text'], text: 'Page not found', parent: ErrorPageInner });
    createNode({
      tag: 'a',
      classes: ['error-page__link'],
      text: 'Go to main page',
      atributesAndValues: [['href', './index.html']],
      parent: ErrorPageInner,
    });
    return main;
  }
}

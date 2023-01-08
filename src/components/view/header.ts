import { createNode } from '../utils/createNode';

export class Header {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
  draw() {
    const header = createNode({ tag: 'header', classes: ['header'] });
    const headerContainer = createNode({ tag: 'div', classes: ['header__inner', 'container'], parent: header });
    const headerTitle = createNode({ tag: 'h1', classes: ['header__title'], parent: headerContainer });
    const headerLink = createNode({
      tag: 'a',
      classes: ['header__link'],
      text: 'Book Store',
      atributesAndValues: [['href', './index.html']],
    });
    headerTitle.append(headerLink);
    const headerCart = createNode({
      tag: 'a',
      classes: ['header__cart', 'cart'],
      atributesAndValues: [
        ['href', `#${this.id}`],
        ['aria-label', 'Cart'],
      ],
      parent: headerContainer,
    });
    const cartCounter = createNode({ tag: 'span', classes: ['cart__counter'], text: '0' });
    headerCart.append(cartCounter);
    document.body.append(header);
  }
}

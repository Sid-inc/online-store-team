import { createNode } from '../utils/createNode';

export class Promo {
  draw() {
    const promo = createNode({ tag: 'div', classes: ['promo'] });
    const promoContainer = createNode({ tag: 'div', classes: ['promo__inner', 'container'], parent: promo });
    createNode({
      tag: 'a',
      classes: ['promo__link'],
      atributesAndValues: [['href', '#shop']],
      text: 'Shop now',
      parent: promoContainer,
    });
    document.body.append(promo);
  }
}

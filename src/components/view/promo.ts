import { createNode } from '../utils/createNode';

export class Promo {
  draw() {
    const promo = createNode({ tag: 'div', classes: ['promo'] });
    createNode({ tag: 'div', classes: ['promo__inner', 'container'], parent: promo });
    document.body.append(promo);
  }
}

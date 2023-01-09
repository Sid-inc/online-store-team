import { ChangeHandler, CartItem } from '../../interfaces';
import { createNode } from '../utils/createNode';

export class ItemActions {
  changeHandler: ChangeHandler;
  item: CartItem;
  limit: number;

  constructor(item: CartItem, limit: number, changeHandler: ChangeHandler) {
    this.changeHandler = changeHandler;
    this.item = item;
    this.limit = limit;
  }

  draw() {
    const itemActions = createNode({ tag: 'div', classes: ['list-item__actions'] });
    const price = createNode({
      tag: 'span',
      classes: ['list-item__price'],
      text: `$${this.item.price * this.item.count}`,
      parent: itemActions,
    });
    const count = createNode({
      tag: 'span',
      classes: ['list-item__current-count'],
      text: `${this.item.count}`,
      parent: itemActions,
    });
    const itemButtons = createNode({ tag: 'div', classes: ['list-item__buttons'], parent: itemActions });
    const moreBtn = createNode({
      tag: 'button',
      classes: ['list-item__button', 'list-item__button--more', 'button', 'button--small'],
      text: '+',
      atributesAndValues: [
        ['type', 'button'],
        ['aria-label', 'More'],
      ],
      parent: itemButtons,
    });
    const lessBtn = createNode({
      tag: 'button',
      classes: ['list-item__button', 'list-item__button--less', 'button', 'button--small'],
      text: '-',
      atributesAndValues: [
        ['type', 'button'],
        ['aria-label', 'Less'],
      ],
      parent: itemButtons,
    });
    createNode({
      tag: 'span',
      classes: ['list-item__amount'],
      text: `Available ${this.limit}`,
      parent: itemActions,
    });
    moreBtn.addEventListener('click', () => {
      if (this.item.count >= this.limit) return;
      this.item.count++;
      const newPrice = this.item.price * this.item.count;
      price.innerHTML = `$${newPrice.toFixed(2)}`;
      count.innerHTML = `${this.item.count}`;
      this.changeHandler('countChange', JSON.stringify(this.item));
    });
    lessBtn.addEventListener('click', () => {
      if (this.item.count <= 1) {
        this.changeHandler('removeItem', `${this.item.id}`);
      } else {
        this.item.count--;
        const newPrice = this.item.price * this.item.count;
        price.innerHTML = `$${newPrice.toFixed(2)}`;
        count.innerHTML = `${this.item.count}`;
        this.changeHandler('countChange', JSON.stringify(this.item));
      }
    });
    return itemActions;
  }
}

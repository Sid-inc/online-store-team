import { Book, CartItem, ChangeHandler } from '../../interfaces';
import { books, settingsForPagination } from '../constants/constants';
import { createNode } from '../utils/createNode';
import { BookStorage } from '../utils/storage';
import { PerPage } from './per-page-items';
import { PageNav } from './page-nav';

export class Cart {
  private storage = new BookStorage();
  private cartListContainer?: HTMLElement;
  private cartList?: CartItem[];
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  draw(): void {
    const cartPage = createNode({ tag: 'main', classes: ['cart-page'] });
    const cartContainer = createNode({ tag: 'div', classes: ['cart-page__inner', 'container'], parent: cartPage });
    const cartList = createNode({ tag: 'div', classes: ['cart-page__list', 'cart-list'], parent: cartContainer });
    const cartHeader = createNode({ tag: 'header', classes: ['cart-list__header'], parent: cartList });
    createNode({ tag: 'header', classes: ['cart-list__title'], text: 'Cart', parent: cartHeader });
    const cartActions = createNode({ tag: 'div', classes: ['cart-list__actions', 'list-actions'], parent: cartHeader });
    const cartPerPage = createNode({
      tag: 'label',
      classes: ['list-actions__per-page'],
      text: 'Per page',
      parent: cartActions,
    });
    const perPageInput = new PerPage(this.changePageHandler);
    const pageNav = new PageNav(this.changePageHandler);
    cartPerPage.append(perPageInput.draw());
    cartActions.append(pageNav.draw());
    this.cartListContainer = createNode({ tag: 'ul', classes: ['cart-list__inner'], parent: cartList });
    const order = createNode({ tag: 'aside', classes: ['cart-page__order', 'order'], parent: cartContainer });
    const orderCount = createNode({ tag: 'span', classes: ['order__count'], text: 'Total count: ', parent: order });
    createNode({ tag: 'b', parent: orderCount });
    const orderPrice = createNode({ tag: 'span', classes: ['order__count'], text: 'Total price: ', parent: order });
    createNode({ tag: 'b', parent: orderPrice });
    createNode({
      tag: 'input',
      classes: ['order__promo', 'field'],
      atributesAndValues: [
        ['type', 'text'],
        ['placeholder', 'Promo code'],
      ],
      parent: order,
    });
    createNode({
      tag: 'button',
      classes: ['order__action', 'button', 'button--primary'],
      atributesAndValues: [['type', 'button']],
      text: 'Order',
      parent: order,
    });
    const footer = document.querySelector('footer') as HTMLElement;
    if (!footer) {
      document.body.append(cartPage);
    } else {
      footer.before(cartPage);
    }
    // document.body.append(cartPage);

    this.drawCartList();
  }

  drawCartList(): void {
    if (this.cartListContainer) {
      this.cartListContainer.innerHTML = '';
    }
    this.cartList = this.storage.getCurrentBooks() ?? [];
    if (!this.cartList.length) return;
    const pagingList = this.getPagingList();

    for (const [index, item] of pagingList[settingsForPagination.currentPage - 1].entries()) {
      const book: Book | undefined = books.find((booksItem) => item.id === booksItem.id);
      if (!book) return;
      const listItem = createNode({
        tag: 'li',
        classes: ['cart-list__item', 'list-item'],
        parent: this.cartListContainer,
      });
      createNode({
        tag: 'span',
        classes: ['list-item__counter'],
        text: `${index + 1}`,
        parent: listItem,
      });
      const itemInner = createNode({ tag: 'div', classes: ['list-item__inner'], parent: listItem });
      createNode({
        tag: 'img',
        classes: ['list-item__image'],
        atributesAndValues: [
          ['src', book.urlToImages[0]],
          ['alt', book.title],
          ['width', '180'],
          ['height', '180'],
        ],
        parent: itemInner,
      });
      const itemInfo = createNode({ tag: 'div', classes: ['list-item__info'], parent: itemInner });
      createNode({ tag: 'span', classes: ['list-item__name'], text: book.title, parent: itemInfo });
      createNode({ tag: 'span', classes: ['list-item__author'], text: book.author, parent: itemInfo });
      createNode({ tag: 'span', classes: ['list-item__category'], text: book.category, parent: itemInfo });
      createNode({ tag: 'span', classes: ['list-item__category'], text: book.cover, parent: itemInfo });
      createNode({ tag: 'span', classes: ['list-item__desc'], text: book.description, parent: itemInfo });
      createNode({ tag: 'span', classes: ['list-item__rating'], text: `${book.rating}`, parent: itemInfo });
      const itemActions = createNode({ tag: 'div', classes: ['list-item__actions'], parent: listItem });
      createNode({ tag: 'span', classes: ['list-item__price'], text: `$${item.price}`, parent: itemActions });
      createNode({ tag: 'span', classes: ['list-item__current-count'], text: `${item.count}`, parent: itemActions });
      const itemButtons = createNode({ tag: 'div', classes: ['list-item__buttons'], parent: itemActions });
      createNode({
        tag: 'button',
        classes: ['list-item__button', 'list-item__button--more', 'button', 'button--small'],
        text: '+',
        atributesAndValues: [
          ['type', 'button'],
          ['aria-label', 'More'],
        ],
        parent: itemButtons,
      });
      createNode({
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
        text: `Available ${book.amount}`,
        parent: itemActions,
      });
      const removeBtn = createNode({
        tag: 'button',
        classes: ['list-item__remove', 'button', 'button--delete'],
        atributesAndValues: [
          ['type', 'button'],
          ['aria-label', 'Remove'],
        ],
        parent: listItem,
      });
      removeBtn.addEventListener('click', () => {
        this.storage.removeBook(item.id);
        this.drawCartList();
      });
    }
  }

  changePageHandler: ChangeHandler = (action, value) => {
    if (action === 'changePerPage') settingsForPagination.perPage = +value;
    if (action === 'changeCurrentPage') settingsForPagination.currentPage = +value;
    this.drawCartList();
  };

  getPagingList(): CartItem[][] {
    if (!this.cartList) return [];
    const res = [];
    for (let i = 0; i < this.cartList.length; i += settingsForPagination.perPage) {
      const chunk = this.cartList.slice(i, i + settingsForPagination.perPage);
      res.push(chunk);
    }
    settingsForPagination.pagesCount = res.length;
    return res;
  }
}

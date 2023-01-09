import { Book, CartItem, ChangeHandler } from '../../interfaces';
import { books, settingsForPagination } from '../constants/constants';
import { createNode } from '../utils/createNode';
import { BookStorage } from '../utils/storage';
import { PerPage } from './per-page-items';
import { PageNav } from './page-nav';
import { ItemActions } from './item-actions';
import { cartParams, getCartParams } from '../utils/cartParams';
import { drowInHeaderAmountBooksInCart, drowInHeaderPriceBooksInCart } from '../utils/amountBookInCart';

export class Cart {
  private readonly promoCodes: string[] = ['rsschool', 'app'];
  private selectedPromoCodes: string[] = [];
  private storage = new BookStorage();
  private cartPage?: HTMLElement;
  private cartListContainer?: HTMLElement;
  private cartList?: CartItem[];
  private fullPrice?: HTMLElement;
  private fullCount?: HTMLElement;
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  draw(): void {
    this.cartPage = createNode({ tag: 'main', classes: ['cart-page'] });
    const cartListItems = this.storage.getCurrentBooks();
    if (!cartListItems || !cartListItems.length) {
      this.drawEmptyCart();
      const footer = document.querySelector('footer') as HTMLElement;
      if (!footer) {
        document.body.append(this.cartPage);
      } else {
        footer.before(this.cartPage);
      }
      return;
    }
    getCartParams();
    const cartContainer = createNode({ tag: 'div', classes: ['cart-page__inner', 'container'], parent: this.cartPage });
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
    this.fullCount = createNode({ tag: 'b', parent: orderCount });
    const orderPrice = createNode({ tag: 'span', classes: ['order__count'], text: 'Total price: ', parent: order });
    this.fullPrice = createNode({ tag: 'b', parent: orderPrice });
    const orderPromo = createNode({ tag: 'div', classes: ['order__promo'], parent: order });
    const promoField = createNode({
      tag: 'input',
      classes: ['order__field', 'field'],
      atributesAndValues: [
        ['type', 'text'],
        ['placeholder', 'Promo code'],
      ],
      parent: orderPromo,
    });
    createNode({ tag: 'span', classes: ['order__text'], text: 'Test: rsschool, app', parent: orderPromo });
    createNode({
      tag: 'button',
      classes: ['order__action', 'button', 'button--primary'],
      atributesAndValues: [['type', 'button']],
      text: 'Order',
      parent: order,
    });

    promoField.addEventListener('input', () => {
      const value = (promoField as HTMLInputElement).value;
      if (this.promoCodes.includes(value) && !this.selectedPromoCodes.includes(value)) {
        const promoList = createNode({ tag: 'div', classes: ['order__promo-available'], parent: orderPromo });
        createNode({
          tag: 'span',
          classes: ['order__promo-title'],
          text: `Found promo ${value} - 10%`,
          parent: promoList,
        });
        const promoAction = createNode({
          tag: 'button',
          classes: ['order__promo-apply', 'button', 'button--link'],
          atributesAndValues: [['type', 'button']],
          text: 'Apply',
          parent: promoList,
        });
        promoAction.addEventListener('click', () => {
          this.selectedPromoCodes.push(value);
          this.updateFullPriceAndCount();
          (promoField as HTMLInputElement).value = '';
          promoList.remove();
        });
      }
    });
    const footer = document.querySelector('footer') as HTMLElement;
    if (!footer) {
      document.body.append(this.cartPage);
    } else {
      footer.before(this.cartPage);
    }
    // document.body.append(cartPage);

    this.drawCartList();
    this.updateFullPriceAndCount();
  }

  drawCartList(): void {
    if (this.cartListContainer) {
      this.cartListContainer.innerHTML = '';
    }
    this.cartList = this.storage.getCurrentBooks() ?? [];
    if (!this.cartList.length) return;
    const pagingList = this.getPagingList();

    if (settingsForPagination.currentPage > pagingList.length) {
      settingsForPagination.currentPage = pagingList.length;
      cartParams();
      const currentPage = document.querySelector('.pages__count');
      if (currentPage instanceof HTMLElement) {
        currentPage.innerHTML = `${settingsForPagination.currentPage}`;
      }
    }

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
      const itemActions = new ItemActions(item, book.amount, this.changePageHandler);
      listItem.append(itemActions.draw());
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
        const cartListItems = this.storage.getCurrentBooks();
        if (!cartListItems || !cartListItems.length) {
          this.drawEmptyCart();
          return;
        }
        this.drawCartList();
        this.updateFullPriceAndCount();
        drowInHeaderAmountBooksInCart();
        drowInHeaderPriceBooksInCart();
      });
    }
  }

  changePageHandler: ChangeHandler = (action, value) => {
    if (action === 'changePerPage') {
      settingsForPagination.perPage = +value;
      cartParams();
      this.drawCartList();
    }
    if (action === 'changeCurrentPage') {
      settingsForPagination.currentPage = +value;
      cartParams();
      this.drawCartList();
    }
    if (action === 'removeItem') {
      this.storage.removeBook(+value);
      const cartListItems = this.storage.getCurrentBooks();
      if (!cartListItems || !cartListItems.length) {
        this.drawEmptyCart();
        return;
      }
      this.drawCartList();
      this.updateFullPriceAndCount();
    }
    if (action === 'countChange') {
      const item: CartItem = JSON.parse(value);
      this.storage.update(item);
      this.updateFullPriceAndCount();
    }
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

  updateFullPriceAndCount(): void {
    const fullItems = this.storage.getCurrentBooks();
    if (this.fullPrice) {
      const fullPrice = fullItems?.reduce((acc, item) => {
        acc += item.price * item.count;
        return acc;
      }, 0);
      this.fullPrice.innerHTML = `$${fullPrice?.toFixed(2)}`;
      this.fullPrice.classList.remove('order__price-old');

      if (this.selectedPromoCodes.length && fullPrice) {
        this.fullPrice.classList.add('order__price-old');
        const oldNewPrice = document.querySelector('.order__count--new');
        if (oldNewPrice) oldNewPrice.remove();
        const newPrice = createNode({
          tag: 'span',
          classes: ['order__count', 'order__count--new'],
          text: 'Final price: ',
        });
        createNode({
          tag: 'b',
          text: `${(fullPrice - (fullPrice * (this.selectedPromoCodes.length * 10)) / 100).toFixed(2)}`,
          parent: newPrice,
        });
        const priceWrapper = this.fullPrice.parentElement;
        priceWrapper?.after(newPrice);

        const oldpromoList = document.querySelector('.order__promo-available--remove');
        if (oldpromoList) oldpromoList.remove();
        const promoList = createNode({
          tag: 'div',
          classes: ['order__promo-available', 'order__promo-available--remove'],
        });

        for (const item of this.selectedPromoCodes) {
          const promoItem = createNode({ tag: 'div', classes: ['order__promo-item'], parent: promoList });
          createNode({
            tag: 'span',
            classes: ['order__promo-title'],
            text: `Applied ${item} - 10%`,
            parent: promoItem,
          });
          const promoAction = createNode({
            tag: 'button',
            classes: ['order__promo-apply', 'button', 'button--link'],
            atributesAndValues: [['type', 'button']],
            text: 'Remove',
            parent: promoItem,
          });
          promoAction.addEventListener('click', () => {
            this.selectedPromoCodes.splice(this.selectedPromoCodes.indexOf(item), 1);
            newPrice.remove();
            promoList.remove();
            this.updateFullPriceAndCount();
          });
        }

        newPrice.after(promoList);
      }
    }
    if (this.fullCount) {
      const fullCount = fullItems?.reduce((acc, item) => {
        acc += item.count;
        return acc;
      }, 0);
      this.fullCount.innerHTML = `${fullCount}`;
    }
  }

  drawEmptyCart() {
    if (this.cartPage) {
      this.cartPage.innerHTML = '';
      const emptyContainer = createNode({
        tag: 'div',
        classes: ['cart-page__empty', 'page-empty', 'container'],
        parent: this.cartPage,
      });
      createNode({
        tag: 'span',
        classes: ['page-empty__text'],
        text: 'Cart is empty',
        parent: emptyContainer,
      });
    }
  }
}

import { Book } from '../../interfaces';
import { drowInHeaderAmountBooksInCart, drowInHeaderPriceBooksInCart } from '../utils/amountBookInCart';
import { CheckBookInCart } from '../utils/CheckBookInCart';
import { createNode } from '../utils/createNode';
import { BookStorage } from '../utils/storage';

export class Card {
  storage: BookStorage = new BookStorage();
  product: Book;
  constructor(product: Book) {
    this.product = product;
  }
  getCardElement() {
    const itemCard = createNode({ tag: 'li', classes: ['product-list__item', 'product'] });
    const itemLink = createNode({
      tag: 'a',
      classes: ['product__link'],
      atributesAndValues: [['href', `#book${this.product.id}`]],
      parent: itemCard,
    });
    const itemImage = createNode({
      tag: 'img',
      classes: ['product__image'],
      atributesAndValues: [
        ['src', this.product.urlToImages[0]],
        ['alt', 'Book Image'],
      ],
      parent: itemLink,
    });
    itemImage.style.width = '275px';
    itemImage.style.height = '340px';
    const productFooter = createNode({ tag: 'div', classes: ['product__footer'], parent: itemCard });
    const productDesc = createNode({ tag: 'div', classes: ['product__desc'], parent: productFooter });
    const productTitle = createNode({ tag: 'span', classes: ['product__title'], text: this.product.title });
    const productAuthor = createNode({ tag: 'span', classes: ['product__author'], text: this.product.author });
    const productRaiting = createNode({
      tag: 'span',
      classes: ['product__raiting'],
      text: `${this.product.rating.toFixed(1)}`,
    });
    const productPrice = createNode({
      tag: 'span',
      classes: ['product__price'],
      text: `$${this.product.price.toFixed(2)}`,
    });
    const productAmount = createNode({
      tag: 'span',
      classes: ['product__price'],
      text: `Amount of books in the store: ${this.product.amount}`,
    });
    productDesc.append(productTitle, productAuthor, productRaiting, productPrice, productAmount);
    const productButton = createNode({
      tag: 'button',
      classes: ['product__action'],
      atributesAndValues: [
        ['type', 'button'],
        ['title', 'add to cart'],
      ],
    });
    if (CheckBookInCart(this.product)) {
      productButton.classList.add('product__action_in-cart');
    }
    productButton.addEventListener('click', () => {
      productButton.classList.toggle('product__action_in-cart');
      const booksInCart = this.storage.getCurrentBooks();
      if (!booksInCart) {
        this.storage.addBook(this.product);
      } else if (Array.isArray(booksInCart)) {
        if (booksInCart.findIndex((el) => el.id === this.product.id) === -1) {
          this.storage.addBook(this.product);
        } else {
          this.storage.removeBook(this.product.id);
        }
      }
      drowInHeaderAmountBooksInCart();
      drowInHeaderPriceBooksInCart();
    });
    productFooter.append(productButton);
    return itemCard;
  }
}

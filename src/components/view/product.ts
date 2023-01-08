import { Book } from '../../interfaces';
import { createNode } from '../utils/createNode';

export class Product {
  id: number;
  product: Book;

  constructor(products: Book[]) {
    this.id = products.findIndex((el) => el.id === +location.hash.slice(5));
    this.product = products[+this.id];
  }
  draw() {
    const main = createNode({ tag: 'main', classes: ['single-product'] });
    const singleProducInner = createNode({ tag: 'div', classes: ['single-product__inner', 'container'], parent: main });
    const singleProductHeader = createNode({
      tag: 'div',
      classes: ['single-product__header'],
      parent: singleProducInner,
    });
    const ol = createNode({
      tag: 'ol',
      classes: ['single-product__bread-crumbs', 'bread-crumbs'],
      parent: singleProductHeader,
    });
    ol.append(
      this.drawLi('Catalog'),
      this.drawLi(this.product.cover),
      this.drawLi(this.product.category),
      this.drawLi(this.product.author),
      this.drawLi(this.product.title)
    );
    const singleProductContent = createNode({
      tag: 'div',
      classes: ['single-product__content'],
      parent: singleProducInner,
    });
    const imges = createNode({
      tag: 'div',
      classes: ['single-product__imges', 'product-imges'],
      parent: singleProductContent,
    });
    const imgMain = createNode({ tag: 'div', classes: ['product-imges__main'], parent: imges });
    const img = createNode({
      tag: 'img',
      classes: ['product-imges__image'],
      atributesAndValues: [
        ['src', this.product.urlToImages[0]],
        ['alt', this.product.title],
      ],
      parent: imgMain,
    });
    img.style.width = '400px';
    img.style.height = '400px';
    const imgesList = createNode({ tag: 'ul', classes: ['product-imges__list', 'imges-list'], parent: imges });
    this.product.urlToImages.forEach((img, index) => {
      const li = createNode({ tag: 'li', classes: ['imges-list__item'] });
      const button = createNode({
        tag: 'button',
        classes: ['imges-list__action', 'imges-list__action--current'],
        parent: li,
      });
      const image = createNode({
        tag: 'img',
        classes: ['imges-list__image'],
        atributesAndValues: [
          ['src', this.product.urlToImages[index]],
          ['alt', this.product.title],
        ],
        parent: button,
      });
      image.style.width = '80px';
      image.style.height = '80px';
      imgesList.append(li);
      button.addEventListener('click', (event) => {
        const target = event.target as HTMLImageElement;
        const img = document.querySelector('.product-imges__image');
        if (img instanceof HTMLImageElement) {
          img.src = target.src;
        }
      });
    });
    const desc = createNode({
      tag: 'div',
      classes: ['single-product__desc', 'product-desc'],
      parent: singleProductContent,
    });
    const descHeader = createNode({ tag: 'div', classes: ['product-desc__header'], parent: desc });
    const buttonAddToCart = createNode({
      tag: 'button',
      classes: ['product-desc__action', 'button'],
      atributesAndValues: [['type', 'button']],
      text: 'Add to cart',
      parent: descHeader,
    });
    const buttonBuyNow = createNode({
      tag: 'button',
      classes: ['product-desc__action', 'button', 'button--primary'],
      atributesAndValues: [['type', 'button']],
      text: 'Buy now',
      parent: descHeader,
    });
    const descInner = createNode({ tag: 'div', classes: ['product-desc__inner'], parent: desc });
    createNode({ tag: 'h2', classes: ['product-desc__title'], text: this.product.title, parent: descInner });
    createNode({
      tag: 'span',
      classes: ['product-desc__author'],
      text: `Author: ${this.product.author}`,
      parent: descInner,
    });
    if (this.product.isBestSeller) {
      createNode({
        tag: 'span',
        classes: ['product-desc__best-badge'],
        text: `Best seller`,
        parent: descInner,
      });
    }
    createNode({
      tag: 'span',
      classes: ['product-desc__cover'],
      text: `Cover: ${this.product.cover}`,
      parent: descInner,
    });
    createNode({
      tag: 'span',
      classes: ['product-desc__category'],
      text: `Category: ${this.product.category}`,
      parent: descInner,
    });
    createNode({
      tag: 'span',
      classes: ['product-desc__rating'],
      text: `Raiting: ${this.product.rating}`,
      parent: descInner,
    });
    createNode({
      tag: 'span',
      classes: ['product-desc__price'],
      text: `Price: $${this.product.price.toFixed(2)}`,
      parent: descInner,
    });
    createNode({
      tag: 'span',
      classes: ['product-desc__amount'],
      text: `Aviable: ${this.product.amount}`,
      parent: descInner,
    });
    createNode({
      tag: 'span',
      classes: ['product-desc__desc'],
      text: this.product.description,
      parent: descInner,
    });
    return main;
  }

  private drawLi(text: string) {
    const li = createNode({ tag: 'li', classes: ['bread-crumbs__item'] });
    createNode({ tag: 'span', classes: ['bread-crumbs__text'], text: text, parent: li });
    return li;
  }
}

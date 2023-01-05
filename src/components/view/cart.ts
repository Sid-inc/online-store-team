import { Book } from '../../interfaces';
import { createNode } from '../utils/createNode';
import { BookStorage } from '../utils/storage';

export class Cart {
  private storage = new BookStorage();
  public cartList?: Book[];

  draw() {
    const cartPage = createNode({ tag: 'main', classes: ['cart-page'] });
    const cartContainer = createNode({ tag: 'div', classes: ['cart-page__inner', 'container'], parent: cartPage });
    const cartList = createNode({ tag: 'div', classes: ['cart-page__list', 'cart-list'], parent: cartContainer });
    const cartHeader = createNode({ tag: 'header', classes: ['cart-list__header'], parent: cartList });
    const cartTitle = createNode({ tag: 'header', classes: ['cart-list__title'], text: 'Cart', parent: cartHeader });
    const cartActions = createNode({ tag: 'div', classes: ['cart-list__actions', 'list-actions'], parent: cartHeader });
    const cartPerPage = createNode({ tag: 'label', classes: ['list-actions__per-page'], text: 'Per page', parent: cartActions });
    const cartPerPageInput = createNode({
      tag: 'label',
      classes: ['list-actions__limit', 'field'],
      atributesAndValues: [
        ['type', 'number'],
        ['min', '1'],
        ['max', '99'],
        ['value', '10'],
      ],
      parent: cartPerPage,
    });
    const cartInner = createNode({ tag: 'ul', classes: ['cart-list__inner'], parent: cartList });
    // const moc = {
    //   category: 'classic',
    //   id: 1,
    //   title: 'Greatest Works of Oscar Wilde (DELUXE HARDBOUND EDITION)',
    //   author: 'Oscar Wilde',
    //   price: 42.43,
    //   urlToImages: [
    //     'https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/81Ko4PmfouS.jpg',
    //     'https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/81pTUrv0QnL.jpg',
    //     'https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/911vRWx1WPL.jpg',
    //   ],
    //   rating: 4.6,
    //   isBestSeller: true,
    //   cover: Cover.HARDCOVER,
    //   description:
    //     'From criticism, essays, reviews, to novels, poetry, short stories, plays, and even children’s fiction, The witty and versatile Oscar Wilde wrote a lot. Amongst all these are two of his masterstrokes, works that earned him laurels and established his fame as a writer. This beautiful leather-bound edition, with gilded edges and beautiful endpapers, holds these critically acclaimed pieces—the importance of Being earnest, a play that has been revived many times and adapted for radio, television, film, operas, musicals, and the picture of Dorian Gray, Wilde’s only novel that became his most-read and well-known work.',
    //   amount: 15,
    // };
    // this.storage.addBook(moc);
  }
}

import { Book } from '../../interfaces';

export function countKeys(books: Book[], key: keyof Pick<Book, 'author' | 'category'>) {
  return books.reduce((acc: Record<string, number>, item: Book) => {
    if (acc[item[key]]) {
      acc[item[key]] += 1;
    } else {
      acc[item[key]] = 1;
    }
    return acc;
  }, {});
}

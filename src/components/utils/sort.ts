// import { Book } from '../../interfaces';
import { settingsForSort } from '../constants/constants';
// import { books } from '../constants/constants';

// function searchBooks(input: HTMLInputElement, arr: Book[]) {
//   const val: string = input.value.trimStart().toUpperCase();
//   const searchBooks: Book[] = [];

//   if (val == '') {
//     return arr;
//   } else {
//     arr.forEach((element: Book) => {
//       if (
//         element.amount.toString().toUpperCase().search(val) !== -1 ||
//         element.author.toUpperCase().search(val) !== -1 ||
//         element.category.toUpperCase().search(val) !== -1 ||
//         element.price.toString().toUpperCase().search(val) !== -1 ||
//         element.title.toUpperCase().search(val) !== -1
//       ) {
//         searchBooks.push(element);
//       }
//     });
//   }
//   // console.log(searchBooks);
//   return searchBooks;
// }

export function getSortValue(select: HTMLSelectElement) {
  const value: string = select.value;
  settingsForSort.filtersSort = value;
}

// export function getBooksForCreateCatalog(input: HTMLInputElement, section: HTMLSelectElement, arr: Book[]) {
//   searchBooks(input, arr);
//   // sortAscendingOrDescending(section, arr);
//   return arr;
// }

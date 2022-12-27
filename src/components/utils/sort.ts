import { Book, SettingsForSort } from '../../interfaces';

export function searchBooks(arr: Book[], setting: SettingsForSort) {
  const val: string = setting.searchValue.toUpperCase();
  console.log(val);

  if (val === '') {
    return arr;
  } else {
    return arr.filter((element) => {
      return (
        element.amount.toString().toUpperCase().includes(val) ||
        element.author.toUpperCase().includes(val) ||
        element.category.toUpperCase().includes(val) ||
        element.price.toString().toUpperCase().includes(val) ||
        element.title.toUpperCase().includes(val)
      );
    });
  }
}

export function getSortValue(arr: Book[], setting: SettingsForSort) {
  const value = setting.filtersSort;
  console.log(`value - ${value}`);

  switch (value) {
    case 'pasc':
      return arr.sort((a, b) => a.price - b.price);
    case 'pdsc':
      return arr.sort((a, b) => b.price - a.price);
    case 'rasc':
      return arr.sort((a, b) => a.rating - b.rating);
    case 'rdsc':
      return arr.sort((a, b) => b.rating - a.rating);
  }
}

function filterByAythor(arr: Book[], setting: SettingsForSort) {
  if (setting.authorSort.length === 0) {
    return arr;
  } else {
    return arr.filter((book) => setting.authorSort.includes(book.author));
    // const sortArr: Book[] = setting.authorSort.reduce((acc: Book[], author) => {
    //   for (let i = 0; i < arr.length; i++) {
    //     if (author === arr[i].author) {
    //       const book: Book = arr[i];
    //       acc.push(book);
    //     }
    //   }
    //   return acc;
    // }, []);
    // return sortArr;
  }
}
// function filterByCategory(arr: Book[], setting: SettingsForSort) {
//   if (setting.categorySort.length === 0) {
//     return arr;
//   } else {
//     const arrSort = arr.filter((el: Book) => setting.categorySort.includes(el.category));
//     return arrSort;
//   }
// }

export function getBooks(arr: Book[], setting: SettingsForSort) {
  const sortArr: Book[] = searchBooks(arr, setting);
  getSortValue(sortArr, setting);
  // filterByCategory(arr, setting);
  filterByAythor(arr, setting);
  console.log(sortArr);
  return sortArr;
}

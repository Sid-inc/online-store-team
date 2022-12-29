import { Book, SettingsForSort } from '../../interfaces';

function searchBooks(arr: Book[], setting: SettingsForSort) {
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

function getSortValue(arr: Book[], setting: SettingsForSort) {
  const value = setting.filtersSort;

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
  console.log(`setting.authorSort - ${setting.authorSort}`);
  if (setting.authorSort.length === 0) {
    return arr;
  } else {
    return arr.filter((book) => setting.authorSort.includes(book.author));
  }
}
function filterByCategories(arr: Book[], setting: SettingsForSort) {
  console.log(`setting.category - ${setting.categorySort}`);
  if (setting.categorySort.length === 0) {
    return arr;
  } else {
    return arr.filter((book) => setting.categorySort.includes(book.category));
  }
}

export function getBooks(arr: Book[], settingsForSort: SettingsForSort) {
  let booksBySearch = searchBooks(arr, settingsForSort);
  getSortValue(booksBySearch, settingsForSort);
  booksBySearch = filterByAythor(booksBySearch, settingsForSort);
  booksBySearch = filterByCategories(booksBySearch, settingsForSort);
  console.log(booksBySearch);

  return booksBySearch;
}

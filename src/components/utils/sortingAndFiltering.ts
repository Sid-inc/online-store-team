import { Book, SettingsForSort } from '../../interfaces';
import { maxAmount, maxPrice, minAmount, minPrice } from '../utils/minMaxPriceAndAmount';

function searchBooks(arr: Book[], setting: SettingsForSort) {
  const val: string = setting.search.toUpperCase();

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
  const value = setting.sort;

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
  if (setting.author.length === 0) {
    return arr;
  } else {
    return arr.filter((book) => setting.author.includes(book.author));
  }
}
function filterByCategories(arr: Book[], setting: SettingsForSort) {
  if (setting.category.length === 0) {
    return arr;
  } else {
    return arr.filter((book) => setting.category.includes(book.category));
  }
}
function filterByPrice(arr: Book[], setting: SettingsForSort) {
  return arr.filter((book) => book.price >= setting.priceMin && book.price <= setting.priceMax);
}
function filterByAmount(arr: Book[], setting: SettingsForSort) {
  return arr.filter((book) => book.amount >= setting.countMin && book.amount <= setting.countMax);
}

function setminMaxPriceAndAmountInSlider(arr: Book[], settingsForSort: SettingsForSort) {
  settingsForSort.priceMin = minPrice(arr);
  settingsForSort.priceMax = maxPrice(arr);
  settingsForSort.countMin = minAmount(arr);
  settingsForSort.countMax = maxAmount(arr);
}

export function getBooks(arr: Book[], settingsForSort: SettingsForSort) {
  setminMaxPriceAndAmountInSlider(arr, settingsForSort);
  let booksBySearch = searchBooks(arr, settingsForSort);
  getSortValue(booksBySearch, settingsForSort);
  booksBySearch = filterByAythor(booksBySearch, settingsForSort);
  booksBySearch = filterByCategories(booksBySearch, settingsForSort);
  booksBySearch = filterByPrice(booksBySearch, settingsForSort);
  booksBySearch = filterByAmount(booksBySearch, settingsForSort);
  setminMaxPriceAndAmountInSlider(booksBySearch, settingsForSort);

  return booksBySearch;
}

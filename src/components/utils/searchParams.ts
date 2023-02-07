import { BOOKS_ON_SALE, SETTINGS_FOR_SORT } from '../constants/constants';
import { maxAmount, maxPrice, minAmount, minPrice } from './minMaxPriceAndAmount';

export function searchParams() {
  const url: URL = new URL(window.location.href);

  url.searchParams.delete('search');
  if (SETTINGS_FOR_SORT.search !== '') {
    url.searchParams.append('search', SETTINGS_FOR_SORT.search);
  }
  url.searchParams.delete('category');
  if (SETTINGS_FOR_SORT.category.length !== 0) {
    url.searchParams.append('category', SETTINGS_FOR_SORT.category.join(','));
  }
  url.searchParams.delete('author');
  if (SETTINGS_FOR_SORT.author.length !== 0) {
    url.searchParams.append('author', SETTINGS_FOR_SORT.author.join(','));
  }
  url.searchParams.delete('sort');
  url.searchParams.append('sort', SETTINGS_FOR_SORT.sort);
  url.searchParams.delete('priceMin');
  if (SETTINGS_FOR_SORT.priceMin !== minPrice(BOOKS_ON_SALE)) {
    url.searchParams.append('priceMin', SETTINGS_FOR_SORT.priceMin.toString());
  }
  url.searchParams.delete('priceMax');
  if (SETTINGS_FOR_SORT.priceMax !== maxPrice(BOOKS_ON_SALE)) {
    url.searchParams.append('priceMax', SETTINGS_FOR_SORT.priceMax.toString());
  }
  url.searchParams.delete('countMin');
  if (SETTINGS_FOR_SORT.countMin !== minAmount(BOOKS_ON_SALE)) {
    url.searchParams.append('countMin', SETTINGS_FOR_SORT.countMin.toString());
  }
  url.searchParams.delete('countMax');
  if (SETTINGS_FOR_SORT.countMax !== maxAmount(BOOKS_ON_SALE)) {
    url.searchParams.append('priceMin', SETTINGS_FOR_SORT.countMax.toString());
  }
  history.pushState(null, '', url);
}

export function cleanSearchParams() {
  history.pushState(null, '', location.href.split('?')[0]);
}

export function getSearchParams() {
  const url: URL = new URL(window.location.href);
  if (url.search) {
    for (const [name, value] of url.searchParams) {
      if (name === 'search') {
        SETTINGS_FOR_SORT.search = value;
      }
      if (name === 'sort') {
        SETTINGS_FOR_SORT.sort = value;
      }
      if (name === 'category') {
        value.split(',').forEach((el) => SETTINGS_FOR_SORT.category.push(el));
      }
      if (name === 'author') {
        value.split(',').forEach((el) => SETTINGS_FOR_SORT.author.push(el));
      }
      if (name === 'priceMin') {
        SETTINGS_FOR_SORT.priceMin = +value;
      }
      if (name === 'priceMax') {
        SETTINGS_FOR_SORT.priceMax = +value;
      }
      if (name === 'countMin') {
        SETTINGS_FOR_SORT.countMin = +value;
      }
      if (name === 'countMax') {
        SETTINGS_FOR_SORT.countMax = +value;
      }
    }
  }
}

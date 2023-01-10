import { books, settingsForSort } from '../constants/constants';
import { maxAmount, maxPrice, minAmount, minPrice } from './minMaxPriceAndAmount';

export function searchParams() {
  const url: URL = new URL(window.location.href);

  url.searchParams.delete('search');
  if (settingsForSort.search !== '') {
    url.searchParams.append('search', settingsForSort.search);
  }
  url.searchParams.delete('category');
  if (settingsForSort.category.length !== 0) {
    url.searchParams.append('category', settingsForSort.category.join(','));
  }
  url.searchParams.delete('author');
  if (settingsForSort.author.length !== 0) {
    url.searchParams.append('author', settingsForSort.author.join(','));
  }
  url.searchParams.delete('sort');
  url.searchParams.append('sort', settingsForSort.sort);
  url.searchParams.delete('priceMin');
  if (settingsForSort.priceMin !== minPrice(books)) {
    url.searchParams.append('priceMin', settingsForSort.priceMin.toString());
  }
  url.searchParams.delete('priceMax');
  if (settingsForSort.priceMax !== maxPrice(books)) {
    url.searchParams.append('priceMax', settingsForSort.priceMax.toString());
  }
  url.searchParams.delete('countMin');
  if (settingsForSort.countMin !== minAmount(books)) {
    url.searchParams.append('countMin', settingsForSort.countMin.toString());
  }
  url.searchParams.delete('countMax');
  if (settingsForSort.countMax !== maxAmount(books)) {
    url.searchParams.append('priceMin', settingsForSort.countMax.toString());
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
        settingsForSort.search = value;
      }
      if (name === 'sort') {
        settingsForSort.sort = value;
      }
      if (name === 'category') {
        value.split(',').forEach((el) => settingsForSort.category.push(el));
      }
      if (name === 'author') {
        value.split(',').forEach((el) => settingsForSort.author.push(el));
      }
      if (name === 'priceMin') {
        settingsForSort.priceMin = +value;
      }
      if (name === 'priceMax') {
        settingsForSort.priceMax = +value;
      }
      if (name === 'countMin') {
        settingsForSort.countMin = +value;
      }
      if (name === 'countMax') {
        settingsForSort.countMax = +value;
      }
    }
  }
}

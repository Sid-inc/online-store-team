import { Queries } from '../../interfaces';
import { books, settingsForSort } from '../constants/constants';
import { maxAmount, maxPrice, minAmount, minPrice } from './minMaxPriceAndAmount';

export function searchParams() {
  const url: URL = new URL(window.location.href);
  const queries: Queries = {};
  if (settingsForSort.search !== '') {
    url.searchParams.delete('search');
    queries.search = settingsForSort.search;
    url.searchParams.append('search', queries.search);
  }
  if (settingsForSort.category.length !== 0) {
    url.searchParams.delete('category');
    queries.category = settingsForSort.category;
    url.searchParams.append('category', queries.category.join(','));
  }
  if (settingsForSort.author.length !== 0) {
    url.searchParams.delete('author');
    queries.author = settingsForSort.author;
    url.searchParams.append('author', queries.author.join(','));
  }
  url.searchParams.delete('sort');
  queries.sort = settingsForSort.sort;
  url.searchParams.append('sort', queries.sort);
  if (settingsForSort.priceMin !== minPrice(books)) {
    url.searchParams.delete('priceMin');
    queries.priceMin = settingsForSort.priceMin.toString();
    url.searchParams.append('priceMin', queries.priceMin);
  }
  if (settingsForSort.priceMax !== maxPrice(books)) {
    url.searchParams.delete('priceMax');
    queries.priceMax = settingsForSort.priceMax.toString();
    url.searchParams.append('priceMax', queries.priceMax);
  }
  if (settingsForSort.countMin !== minAmount(books)) {
    url.searchParams.delete('countMin');
    queries.countMin = settingsForSort.countMin.toString();
    url.searchParams.append('countMin', queries.countMin);
  }
  if (settingsForSort.countMax !== maxAmount(books)) {
    url.searchParams.delete('countMax');
    queries.countMax = settingsForSort.countMax.toString();
    url.searchParams.append('priceMin', queries.countMax);
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

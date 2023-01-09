import { CartQueries } from '../../interfaces';
import { settingsForPagination } from '../constants/constants';

export function cartParams() {
  const url: URL = new URL(window.location.href);
  const queries: CartQueries = {};

  if (settingsForPagination.perPage !== 10) {
    url.searchParams.delete('perPage');
    queries.perPage = `${settingsForPagination.perPage}`;
    url.searchParams.append('perPage', queries.perPage);
  }

  if (settingsForPagination.currentPage !== 1) {
    url.searchParams.delete('currentPage');
    queries.currentPage = `${settingsForPagination.currentPage}`;
    url.searchParams.append('currentPage', queries.currentPage);
  }

  history.pushState(null, '', url);
}

export function getCartParams() {
  const url: URL = new URL(window.location.href);
  if (url.search) {
    for (const [name, value] of url.searchParams) {
      if (name === 'perPage') {
        settingsForPagination.perPage = +value;
      }
      if (name === 'currentPage') {
        settingsForPagination.currentPage = +value;
      }
    }
  }
}

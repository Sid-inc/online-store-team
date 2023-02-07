import { CartQueries } from '../../interfaces';
import { SETTINGS_FOR_PAGINATION } from '../constants/constants';

export function cartParams() {
  const url: URL = new URL(window.location.href);
  const queries: CartQueries = {};

  if (SETTINGS_FOR_PAGINATION.perPage !== 10) {
    url.searchParams.delete('perPage');
    queries.perPage = `${SETTINGS_FOR_PAGINATION.perPage}`;
    url.searchParams.append('perPage', queries.perPage);
  }

  if (SETTINGS_FOR_PAGINATION.currentPage !== 1) {
    url.searchParams.delete('currentPage');
    queries.currentPage = `${SETTINGS_FOR_PAGINATION.currentPage}`;
    url.searchParams.append('currentPage', queries.currentPage);
  }

  history.pushState(null, '', url);
}

export function getCartParams() {
  const url: URL = new URL(window.location.href);
  if (url.search) {
    for (const [name, value] of url.searchParams) {
      if (name === 'perPage') {
        SETTINGS_FOR_PAGINATION.perPage = +value;
      }
      if (name === 'currentPage') {
        SETTINGS_FOR_PAGINATION.currentPage = +value;
      }
    }
  }
}

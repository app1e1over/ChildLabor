import Pagination from './Helper-pagination'

// PAGINATION
const paginationContainer = document.querySelector(".pagination ul");

// let pageCount;
// let pageIndex;

export function createPagination(pageCount, pageIndex) {
  new Pagination({
  container: paginationContainer,
  count: pageCount,
  index: pageIndex
});
}

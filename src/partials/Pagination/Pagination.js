
import Pagination from './Helper-pagination'

// PAGINATION
const paginationContainer = document.querySelector(".pagination ul");

const pageCount = 2;
let pageIndex = 1;

new Pagination({
  container: paginationContainer,
  count: pageCount,
  index: pageIndex
});



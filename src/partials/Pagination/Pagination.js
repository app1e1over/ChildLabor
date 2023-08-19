// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

// const container = document.getElementById('pagination');
// const pagination = new Pagination(container);

// function calculateVisiblePages() {
//   const screenWidth = window.innerWidth;
  
//   return screenWidth < 768 ? 2 : 3;
// }

// function setupPagination(page, perPage, totalPages, callback) {
// const options = {
//   totalItems: Number(perPage) * Number(totalPages),
//   itemsPerPage: Number(perPage),
//   visiblePages: calculateVisiblePages(),
//   page: Number(Page),
//   centerAlign: false,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//         '<span class="tui-ico-ellip">...</span>' +
//       '</a>'
//   }
// };

//     const pagination = new Pagination('pagination', options);

//     pagination.on('afterMove', ({ page }) => {
//     callback(page);
//   });    
// }    

// export default setupPagination;


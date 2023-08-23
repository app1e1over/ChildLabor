const closeMenuButton = document.querySelector('.mobile-menu-close-btn');
const burgerMenuButton = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('#mobile-menu');

function handlerOnBurgerButtonClick(event) {
  const isOpen = mobileMenu.classList.contains('is-open');
  if (!isOpen) {
    mobileMenu.classList.add('is-open');
    burgerMenuButton.removeEventListener('click', handlerOnBurgerButtonClick);
    closeMenuButton.addEventListener('click', handlerOnCloseMenuButton);
  }
}

function handlerOnCloseMenuButton() {
  const isOpen = mobileMenu.classList.contains('is-open');
  if (isOpen) {
    mobileMenu.classList.remove('is-open');
    closeMenuButton.removeEventListener('click', handlerOnCloseMenuButton);
    burgerMenuButton.addEventListener('click', handlerOnBurgerButtonClick);
  }
}

function startHeader() {
  burgerMenuButton.addEventListener('click', handlerOnBurgerButtonClick);
  closeMenuButton.addEventListener('click', handlerOnCloseMenuButton);
  navListElement.addEventListener('click', onNavMenuLinkClick);

  input.addEventListener('click', changeTheme);

  let savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme && savedTheme === 'dark') {
    input.checked = true;
    body.classList.add('dark');
  } else {
    body.classList.toggle('dark');
    input.checked = false;
    localStorage.setItem('theme', 'light');
  }
}

// Зміна теми,якщо перемикач іконки
// const toggleElement = document.querySelector('.js-toggle');
// const body = document.querySelector('body');
// const iconLightTheme = document.querySelector('.toggle-icon-light-theme');
// const iconDarkTheme = document.querySelector('.toggle-icon-dark-theme');

// function handlerChangeTheme(event) {
//   if (body.classList.contains('dark')) {
//     body.classList.toggle('dark');
//     localStorage.setItem('theme', 'light');
//     iconLightTheme.classList.remove('visually-hidden');
//     iconDarkTheme.classList.add('visually-hidden');
//   } else {
//     body.classList.add('dark');
//     localStorage.setItem('theme', 'dark');
//     iconLightTheme.classList.add('visually-hidden');
//     iconDarkTheme.classList.remove('visually-hidden');
//   }
// }
//Зміна теми з чекбоксом
const inputs = document.querySelectorAll('.checkbox-input');
const body = document.querySelector('body');

inputs.forEach(input => input.addEventListener('click', changeTheme));

let savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme && savedTheme === 'dark') {
  inputs.checked = true;
  body.classList.add('dark');
} else {
  body.classList.toggle('dark');
  inputs.checked = false;
  localStorage.setItem('theme', 'light');
}

function changeTheme() {
  if (body.classList.contains('dark')) {
    body.classList.toggle('dark');
    localStorage.setItem('theme', 'light');
    input.checked = false;
  } else {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    input.checked = true;
  }
}

// Перехід між сторінками

const navListElement = document.querySelector('.js-nav-list');
const title = document.querySelector('title');
const trimmedTitle = title.textContent.trim();

const homePath = 'href="./index.html"';
const favoritesPath = 'href="./favorites.html"';
const currentPath = 'href="./"';
if (trimmedTitle === 'TastyTreats') {
  let markupHome = `<li class="nav-item">
              <a ${currentPath} class="nav-link link current">Home</a>
            </li>
            <li class="nav-item">
              <a ${favoritesPath} class="nav-link link">Favorites</a>
            </li>`;
  navListElement.insertAdjacentHTML('beforeend', markupHome);
} else if (trimmedTitle === 'Favorites') {
  let markupFavorites = `<li class="nav-item">
              <a ${homePath} class="nav-link link">Home</a>
            </li>
            <li class="nav-item">
              <a ${currentPath} class="nav-link link current">Favorites</a>
            </li>`;
  navListElement.insertAdjacentHTML('beforeend', markupFavorites);
}
navListElement.addEventListener('click', onNavMenuLinkClick);
function onNavMenuLinkClick(event) {
  event.preventDefault();
  const clickedLink = event.target.closest('a');
  if (clickedLink) {
    const linkPath = clickedLink.getAttribute('href');
    if (linkPath) {
      window.location.href = linkPath;
    }
  }
}

// test

// const currentUrl = window.location.href;
// if (currentUrl.includes('index.html')) {
//   let markupHome = `<li class="nav-item">
//               <a ${currentPath} class="nav-link link current">Home</a>
//             </li>
//             <li class="nav-item">
//               <a ${favoritesPath} class="nav-link link">Favorites</a>
//             </li>`;
//   navListElement.insertAdjacentHTML('beforeend', markupHome);
// } else if (currentUrl.includes('favorites.html')) {
//   let markupFavorites = `<li class="nav-item">
//               <a ${homePath} class="nav-link link">Home</a>
//             </li>
//             <li class="nav-item">
//               <a ${currentPath} class="nav-link link current">Favorites</a>
//             </li>`;
//   navListElement.insertAdjacentHTML('beforeend', markupFavorites);
// }

export { startHeader };

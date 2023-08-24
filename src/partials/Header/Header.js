const closeMenuButton = document.querySelector('.mobile-menu-close-btn');
const burgerMenuButton = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.js-menu-container');
const mobileBackdrop = document.querySelector('.mobile-backdrop');

function handlerOnBurgerButtonClick(event) {
  const isOpen = mobileMenu.classList.contains('is-open');
  if (!isOpen) {
    mobileMenu.classList.add('is-open');
    mobileBackdrop.classList.remove('is-hidden');
    burgerMenuButton.removeEventListener('click', handlerOnBurgerButtonClick);
    closeMenuButton.addEventListener('click', handlerOnCloseMenuButton);
  }
}

function handlerOnCloseMenuButton() {
  const isOpen = mobileMenu.classList.contains('is-open');
  if (isOpen) {
    mobileMenu.classList.remove('is-open');
    mobileBackdrop.classList.add('is-hidden');
    closeMenuButton.removeEventListener('click', handlerOnCloseMenuButton);
    burgerMenuButton.addEventListener('click', handlerOnBurgerButtonClick);
  }
}

function startHeader() {
  burgerMenuButton.addEventListener('click', handlerOnBurgerButtonClick);
  closeMenuButton.addEventListener('click', handlerOnCloseMenuButton);
  navListElement.addEventListener('click', onNavMenuLinkClick);

  inputs.forEach(input => input.addEventListener('click', changeTheme));

  let savedTheme = localStorage.getItem('theme') ?? 'light';
  inputs.forEach(input =>
    input.forEach(
      input =>
        (input.checked = JSON.parse(localStorage.getItem('checkbox')) ?? false)
    )
  );
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  } else {
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
    }
    localStorage.setItem('theme', 'light');
    localStorage.setItem('checkbox', JSON.stringify(false));
  }
}

//Зміна теми з чекбоксом

const inputs = document.querySelectorAll('.checkbox-input');
const body = document.querySelector('body');

inputs.forEach(input => input.addEventListener('click', changeTheme));

let savedTheme = localStorage.getItem('theme') ?? 'light';
inputs.forEach(
  input =>
    (input.checked = JSON.parse(localStorage.getItem('checkbox')) ?? false)
);
if (savedTheme === 'dark') {
  body.classList.add('dark');
} else {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
  }
  localStorage.setItem('theme', 'light');
  localStorage.setItem('checkbox', JSON.stringify(false));
}

function changeTheme() {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    inputs.forEach(input => input.forEach((input = input.checked = false)));
    localStorage.setItem('theme', 'light');
    localStorage.setItem('checkbox', JSON.stringify(false));
  } else {
    body.classList.add('dark');
    inputs.forEach(input => (input.checked = true));
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('checkbox', JSON.stringify(true));
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

export { startHeader };

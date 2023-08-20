const closeMenuButton = document.querySelector('.mobile-menu-close-btn');
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
  toggleElement.addEventListener('click', handlerChangeTheme);
  let savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('theme', 'dark');
    iconLightTheme.classList.add('visually-hidden');
    iconDarkTheme.classList.remove('visually-hidden');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    iconLightTheme.classList.remove('visually-hidden');
    iconDarkTheme.classList.add('visually-hidden');
  }
}

// Зміна теми
const toggleElement = document.querySelector('.js-toggle');
const body = document.querySelector('body');
const iconLightTheme = document.querySelector('.toggle-icon-light-theme');
const iconDarkTheme = document.querySelector('.toggle-icon-dark-theme');

function handlerChangeTheme(event) {
  if (body.classList.contains('dark')) {
    body.classList.toggle('dark');
    localStorage.setItem('theme', 'light');
    iconLightTheme.classList.remove('visually-hidden');
    iconDarkTheme.classList.add('visually-hidden');
  } else {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    iconLightTheme.classList.add('visually-hidden');
    iconDarkTheme.classList.remove('visually-hidden');
  }
}
export { startHeader };

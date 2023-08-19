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
const toggleElement = document.querySelector('.js-toggle');
const html = document.querySelector('html');

function startHeader() {
  burgerMenuButton.addEventListener('click', handlerOnBurgerButtonClick);
  closeMenuButton.addEventListener('click', handlerOnCloseMenuButton);
  toggleElement.addEventListener('click', handlerChangeTheme);
  let savedTheme = localStorage.getItem('theme') || null;
  if (savedTheme === 'dark') {
    html.classList.add('theme', 'dark');
  } else {
    html.classList.toggle('dark');
    localStorage.setItem('theme', 'light');
  }
}

function handlerChangeTheme(event) {
  if (html.classList.contains('dark')) {
    html.classList.toggle('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}
export { startHeader };

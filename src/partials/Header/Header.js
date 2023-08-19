const closeMenuButton = document.querySelector('.mobile-menu-close-btn');
const mobileMenu = document.querySelector('#mobile-menu');

burgerMenuButton.addEventListener('click', handlerOnBurgerButtonClick);
closeMenuButton.addEventListener('click', handlerOnCloseMenuButton);

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

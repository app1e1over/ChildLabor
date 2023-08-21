const preloader = document.querySelector('.preloader');

// Функція для показу прелоадера
export function showPreloader() {
  preloader.style.display = 'block';
}

// Функція для приховування прелоадера
export function hidePreloader() {
  preloader.style.display = 'none';
}
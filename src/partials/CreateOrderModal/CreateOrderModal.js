function openModal() {
  var modal = document.getElementById('popup');
  modal.classList.remove('is-hidden');
}
function closeModal() {
  var modal = document.getElementById('popup');
  modal.classList.add('is-hidden');
}
// Знаходимо кнопку для відкриття модального вікна
var openButton = document.getElementById('openModalButton');

// Додаємо обробник події для кнопки
openButton.addEventListener('click', openModal);

// Знаходимо всі кнопки для закриття модального вікна
var closeButtonElements = document.querySelectorAll('.js-popup-close');

// Додаємо обробник події для кожної кнопки закриття
closeButtonElements.forEach(function (button) {
  button.addEventListener('click', closeModal);
});

//  <button id="openModalButton">ORDER NOW</button>

// * забирає скрол сторінки коли відкрита модалка
function openModal() {
  var modal = document.getElementById('popup');
  var body = document.body;

  modal.classList.remove('is-hidden');
  body.style.overflow = 'hidden'; // Заборона прокрутки
}

function closeModal() {
  var modal = document.getElementById('popup');
  var body = document.body;

  modal.classList.add('is-hidden');
  body.style.overflow = 'auto'; // Відновлення прокрутки
}

var openButton = document.getElementById('openModalButton');
openButton.addEventListener('click', openModal);

var closeButtonElements = document.querySelectorAll('.js-popup-close');
closeButtonElements.forEach(function (button) {
  button.addEventListener('click', closeModal);
});

export const PopupStart = () => {
  const refs = {
    openPopupBtn: document.querySelector('[data-popup-open]'),
    closePopupBtn: document.querySelector('[data-popup-close]'),
    popup: document.querySelector('.popup-body'),
    backdrop: document.querySelector('.backdrop'),
  };

  refs.openPopupBtn.addEventListener('click', openModal);
  refs.closePopupBtn.addEventListener('click', closeModal);
  refs.backdrop.addEventListener('click', function (event) {
    if (event.target === refs.backdrop) {
      closeModal();
    }
  });

  function openModal() {
    refs.popup.classList.remove('is-hidden');
    refs.backdrop.classList.remove('is-hidden');
    document.body.classList.add('popup-open');
  }

  function closeModal() {
    refs.popup.classList.add('is-hidden');
    refs.backdrop.classList.add('is-hidden');
    document.body.classList.remove('js-popup-open');
  }
};

// function openModal() {
//   var modal = document.getElementById('popup');
//   modal.classList.remove('is-hidden');
// }
// function closeModal() {
//   var modal = document.getElementById('popup');
//   modal.classList.add('is-hidden');
// }
// // Знаходимо кнопку для відкриття модального вікна
// var openButton = document.getElementById('openModalButton');

// // Додаємо обробник події для кнопки
// openButton.addEventListener('click', openModal);

// // Знаходимо всі кнопки для закриття модального вікна
// var closeButtonElements = document.querySelectorAll('.js-popup-close');

// // Додаємо обробник події для кожної кнопки закриття
// closeButtonElements.forEach(function (button) {
//   button.addEventListener('click', closeModal);
// });

//  <button id="openModalButton">ORDER NOW</button>

// export const PopuplStart = () => {
//   const refs = {
//     openPopupBtn: document.querySelector('[data-popup-open]'),
//     closePopupBtn: document.querySelector('[data-popup-close]'),
//     popup: document.querySelector('[data-popup]'),
//     backdrop: document.querySelector('.backdrop'), // Додано посилання на елемент затемнення фону
//   };

//   refs.openPopuplBtn.addEventListener('click', toggleModal);
//   refs.closePopupBtn.addEventListener('click', toggleModal);
//   refs.backdrop.addEventListener('click', toggleModal); // Додано обробник події для закриття при кліку на затемнення

//   function toggleModal() {
//     refs.popup.classList.toggle('is-hidden');
//     refs.backdrop.classList.toggle('is-hidden'); // Додано зміну стану затемнення фону
//     document.body.classList.toggle('popup-open'); // Додано заборону/дозвіл прокрутки тіла
//   }
// };

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

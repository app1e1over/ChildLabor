import axios from 'axios';
import { padEndRating } from '../RecepieCards/RecepieCards';

function getVideoIdFromLink(link) {
  const regex =
    /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([\w-]+)/i;
  const matches = link.match(regex);
  return matches && matches[1] ? matches[1] : '';
}

function onOpenModal(e, dataId) {
  const id = e.target.closest(`[data-${dataId}]`).dataset[dataId];
  document.createElement('div');
  axios
    .get('https://tasty-treats-backend.p.goit.global/api/recipes/' + id)
    .then(response => response.data)
    .then(data => {
      console.log(data);
      refs.nameElement.textContent = data.title; // Оновлюємо назву
      refs.instructionElement.innerHTML = data.instructions;
      let ingredients = data.ingredients;

      let time = data.time;
      refs.timeSpan.textContent = `Time: ${time}`; // тут мы подтянули время

      renderIng(ingredients); // тут мы создаем список ингредиентов

      if (data.youtube) {
        const videoId = getVideoIdFromLink(data.youtube);
        refs.videoElement.innerHTML = `
            <iframe
              width="295"
              height="250"
              src="https://www.youtube.com/embed/${videoId}"
              frameborder="0"
              allowfullscreen
            ></iframe>`;
      } else {
        // Якщо немає відео, відображаємо зображення
        refs.videoElement.innerHTML = `
            <img
              class="recipe-image"
              src="${data.image}"
              alt="Recipe video"
              width="295"
              height="250"
            />`;
      }
      refs.ratingNum.innerHTML = padEndRating(data.rating);
      drawTags(data.tags);

      refs.stars.innerHTML="";
      for (let i = 1; i <= 5; i++) {
        if (data.rating - i >= 0.7) {
          refs.stars.innerHTML +=
            '<svg class="recipe-card-star" width="18" height="18"><path fill="#eea10c" d="M13.826 3.262c.686-2.105 3.664-2.105 4.347 0l1.931 5.943a2.292 2.292 0 0 0 2.174 1.582h6.251c2.215 0 3.134 2.834 1.344 4.135l-5.058 3.673a2.287 2.287 0 0 0-.825 2.572l-.005-.016 1.931 5.945c.686 2.105-1.726 3.858-3.518 2.555l-5.056-3.673c-.372-.273-.839-.437-1.344-.437s-.972.164-1.35.441l.006-.004-5.056 3.673c-1.792 1.303-4.201-.45-3.518-2.555l1.931-5.943a2.282 2.282 0 0 0-.823-2.553l-.006-.004-5.058-3.673c-1.79-1.303-.869-4.137 1.344-4.137h6.251a2.287 2.287 0 0 0 2.167-1.561l.005-.016 1.934-5.943z" style="fill:var(--color5, #eea10c)"/></svg>';
        } else {
          refs.stars.innerHTML +=
            '<svg class="recipe-card-star" width="18" height="18"><path fill="#f8f8f8" d="M13.826 3.262c.686-2.105 3.664-2.105 4.347 0l1.931 5.943a2.292 2.292 0 0 0 2.174 1.582h6.251c2.215 0 3.134 2.834 1.344 4.135l-5.058 3.673a2.287 2.287 0 0 0-.825 2.572l-.005-.016 1.931 5.945c.686 2.105-1.726 3.858-3.518 2.555l-5.056-3.673c-.372-.273-.839-.437-1.344-.437s-.972.164-1.35.441l.006-.004-5.056 3.673c-1.792 1.303-4.201-.45-3.518-2.555l1.931-5.943a2.282 2.282 0 0 0-.823-2.553l-.006-.004-5.058-3.673c-1.79-1.303-.869-4.137 1.344-4.137h6.251a2.287 2.287 0 0 0 2.167-1.561l.005-.016 1.934-5.943z" style="fill:var(--color5, #f8f8f8)"/></svg>';
        }
      }
    });




  refs.modal.classList.toggle('is-hidden');
  refs.closeModalBtn.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onEscKeyPress);
}
function onCloseModal() {
  refs.modal.classList.toggle('is-hidden');
  window.removeEventListener('keydown', onEscKeyPress);
}
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
const refs = {
  openModalBtns: document.querySelectorAll('[data-modal-open]'),
  modal: document.querySelector('[data-modal-recipe]'),
  closeModalBtn: document.querySelector('[data-action="close-modal]'),
  backdrop: document.querySelector('.recipe-backdrop'),
  nameElement: document.querySelector('.selected-recipe-name'),
  instructionElement: document.querySelector('.recipe-instruction'),
  videoElement: document.querySelector('.recipe-video-wrap'),
  ul: document.querySelector('.ingredients'),
  timeSpan: document.querySelector('.cooking-time'),
  tags: document.querySelector('.tags-1'),
  ratingNum: document.querySelector(".rating-number-recipe"),
  stars: document.querySelector(".stars")
};
export const ModalStart = () => {
  // refs.openModalBtns.forEach(btn => {
  //   btn.addEventListener('click', onOpenModal);
  // });
  refs.backdrop.addEventListener('click', onBackdropClick);
};
function renderIng(ingredients) {
  refs.ul.innerHTML = '';
  // а тут лежит функция, которая создает список ингредиентов
  ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.textContent = ingredient.name;
    span.textContent = ingredient.measure;
    li.appendChild(span);
    refs.ul.appendChild(li);
  });
}
export function addModal(el, dataId) {
  el.addEventListener('click', e => {
    onOpenModal(e, dataId);
  });
}
function drawTags(tags) {
  refs.tags.innerHTML = '';
  tags.forEach(tag => {
    refs.tags.innerHTML += ` <li class="tag-item">
        <button class="btn-tag" type="button">
          #${tag}
        </button>
      </li>`;
  });
}

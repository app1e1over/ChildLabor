import { showByCategory } from '../Favorites/Favorites.js';

const cont = document.querySelector('.recipe-container');
const filterBar = document.querySelector('.filters-list');
const favoritesList = document.querySelector('.favorites-container');
const liked = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
const FAV_KEY = 'Favorites';

//  --------------------Copied-------------
export function onCardClick(recepies) {
  cont.addEventListener('click', event => {
    if (event.target.nodeName != 'svg' && event.target.nodeName != 'path')
      return;
    setFavorite(event.target, recepies);
  });
}

//   --------------------Copied-------------
onClickFav(liked);
function onClickFav(recepies) {
  favoritesList.addEventListener('click', event => {
    if (event.target.nodeName != 'svg' && event.target.nodeName != 'path')
      return;
    setFavorite(event.target, recepies);
    updateFilterBar();
    if (!liked || !liked.length) {
      favoritesList.innerHTML = '';
    }
  });
}

//   --------------------Copied-------------
function setFavorite(heart, parseInfo) {
  let heartId = heart.closest('.recipe-card-container').dataset.recipe;
  let id = JSON.parse(localStorage.getItem('id')) || [];
  if (heart.closest('.heart-button').classList.contains('add')) {
    const allCards = document.querySelectorAll('.recipe-card-container');
    allCards.forEach(card => {
      id.forEach(id => {
        if (card.dataset.recipe == id) {
          heart.closest('.heart-button').classList.remove('add');
        }
      });
    });
    id = id.filter(num => num != heartId);
    localStorage.setItem('id', JSON.stringify(id));
    liked = liked.filter(item => item._id != heartId);
    console.log('delete');
  } else {
    parseInfo.forEach((card, idx) => {
      if (card._id == heartId) {
        liked.push(parseInfo[idx]);
        id.push(heartId);
      }
      localStorage.setItem('id', JSON.stringify(id));
      heart.closest('.heart-button').classList.add('add');
    });
    console.log('add');
  }
  localStorage.setItem(FAV_KEY, JSON.stringify(liked));
  updateHearts();
}

updateHearts();
updateFilterBar();

//   --------------------Copied-------------
export function updateHearts() {
  const allCards = document.querySelectorAll('.recipe-card-container');
  let id = JSON.parse(localStorage.getItem('id'));
  if (id) {
    allCards.forEach(card => {
      id.forEach(id => {
        if (card.dataset.recipe == id) {
          card.querySelector('.heart-button').classList.add('add');
        }
      });
    });
  }
}

//   --------------------Copied-------------
function updateFilterBar() {
  if (!liked || !liked.length) {
    filterBar.innerHTML = '';
  } else {
    filterBar.innerHTML = `<li><button class="filters-btn" type="button" data-id="All">All categories</button></li>`;
    createFilters(liked);
    filterBar.insertAdjacentHTML('beforeend', createFilters(liked));
  }
  const btnActive = localStorage.getItem('btn-active');
  if (btnActive) {
    const allBtns = document.querySelectorAll('.filters-btn');
    allBtns.forEach(btn => {
      if (btn.dataset.id == btnActive) {
        showByCategory(btn);
        setActive(btn);
        updateHearts();
      }
    });
  }
}

//   --------------------Copied-------------
function createFilters(liked) {
  const filterArr = liked
    .map(({ category }) => category)
    .filter((name, idx, arr) => arr.indexOf(name) === idx)
    .sort();
  return filterArr
    .map(
      name =>
        `<li><button class="filters-btn" type="button" data-id="${name}">${name}</button></li>`
    )
    .join('');
}

//   --------------------Copied-------------
let isDragging = false;

filterBar.addEventListener('mousemove', onDrag);
filterBar.addEventListener('mousedown', dragStart);
document.addEventListener('mouseup', dragStop);

function dragStop() {
  isDragging = false;
}
function dragStart() {
  isDragging = true;
}
function onDrag(e) {
  if (!isDragging) return;
  filterBar.scrollLeft -= e.movementX;
}

//   --------------------Copied-------------
filterBar.addEventListener('click', onClick);
function onClick(evt) {
  if (evt.target.nodeName != 'BUTTON') return;
  setActive(evt.target);
  showByCategory(evt.target);
  updateHearts();
}

//   --------------------Copied-------------
function setActive(btn) {
  const allBtns = document.querySelectorAll('.filters-btn');
  allBtns.forEach(btn => btn.classList.remove('active'));
  btn.classList.add('active');
  localStorage.setItem('btn-active', btn.dataset.recipe);
}

// -------------код Дарини
import axios from 'axios';

import axios from 'axios';
import { DrawCard } from '../RecepieCards/RecepieCards.js';
import { createPagination } from '../Pagination/Pagination.js';

// const FAV_KEY = 'Favorites';
// const favoritesList = document.querySelector('.favorites-list');
const favoritesPlug = document.querySelector('.favorites-plug');
const favTestElem = document.querySelector('.test-cards');
const heartButtonElem = document.querySelector('.heart-button');

//ПОТІМ ВИДАЛИТИ - запит на сервер по всіх рецептах
//і заповнення тестової розмітки, щоб побачити кнопку сердечко
const getData = () =>
  axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes`);
getData()
  .then(({ data }) => {
    console.log(data);
    renderRecepieCard(data);
  })
  .catch(console.warn);

//ПОТІМ ВИДАЛИТИ - імітація - рендер розмітки всіх карток
function renderRecepieCard(data) {
  const cardsArr = data.results;

  const markup = cardsArr.map(card => DrowCard(card)).join('');

  favTestElem.innerHTML = markup;

  localStorage.setItem(FAV_KEY, JSON.stringify(cardsArr));
}

//ПОТІМ ВИДАЛИТИ - рендер розмітки одної картки
function DrowCard(card) {
  return `
<div class="recepie-card">
    <img src="${card.preview}" alt="${card.tags}" loading="lazy" />
    <div class="recepie-info">
    <button type="button" class="heart-button" id="${card.id}">press heart</button>
    <h3>${card.title}</h3>
    <p>${card.description}</p>
    </div>
</div>
    `;
}

//ПОТІМ ВИДАЛИТИ - метод addToFavorites, який додає в обрані:
// 1. додає рецепт в ЛС (пушить в масив);
// 2. міняє колір сердечка;
// 3. не викликає UpdateFavorites, а DrowCard, <> insertAdjasentHTML(beforeend, newCard)
// function addToFavorites() {
//     heartButtonElem.classList.add('is-favorite');

//     const selectadRecepie = heartButtonElem.parentNode;
//     console.log(selectadRecepie);
// }

//ПОТІМ ВИДАЛИТИ - метод removeFromFavorites, який видаляє з обраних:
// 1. видаляє рецепт з ЛС;
// 2. міняє колір сердечка;
// 3. викликає UpdateFavorites

// ПОТІМ ВИДАЛИТИ - слухач для сердечок
// document.querySelector('body').addEventListener('click', (event) => {
//     if (event.target.nodeName !== "BUTTON") {
//     return;
//   }
//     if (!heartButtonElem.classList.contains('is-favorite')) {
//         addToFavorites()
//     } else {
//         console.warn();
//     }
// })

// ПРОСТО ВИСИТЬ В КОДІ І ЧЕКАЄ ПУСТИЙ ЛОКАЛ СТОРЕДЖ
// запускається, коли користувач сидів в обраних і повидаляв усі рецепти
export function hadleAllFavoritesDeleted() {
  if (!favoritesArr.length) {
    UpdateFavorites({ page: 1 });
  }
}

// функція UpdateFavorites():
// 1. бере інф з ЛС, де зберіг. [ { }-ів ] з рецептами за кл. сл. 'Favorites'
// 1.1. якщо ЛС пустий: рендер заглушки, ретьорн
// 2. filter, для кожного рецепта виклик DrowCard
// 3. innerHTML = renderedCards
// const selectedCategory = 'Beef';

// function UpdateFavorites() {
//   let favoritesArr = JSON.parse(localStorage.getItem(FAV_KEY));
//   console.log(favoritesArr);

//   if (!favoritesArr.length) {
//     favoritesPlug.classList.remove('is-hidden');
//     return;
//   }

//   const filteredFavorites = favoritesArr.filter(
//     recepie => recepie.category === selectedCategory
//   );
//   // let pageIndex = 1;
const cardsPerPage = 12;
export function StartFavorites() {
  let favoritesArr = JSON.parse(localStorage.getItem(FAV_KEY));
  let pageCount = Math.ceil(favoritesArr.length / cardsPerPage);
  UpdateFavorites({ page: 1 });

  createPagination(pageCount, 1, UpdateFavorites);
}

// ВИКЛИКАЄТЬСЯ ПРИ СТАРТІ
export function UpdateFavorites({ page }) {
  favoritesList.innerHTML = '';
  favoritesPlug.classList.add('is-hidden');
  favImgElem.classList.remove('is-hidden');

  let favoritesArr = JSON.parse(localStorage.getItem(FAV_KEY));
  console.log(favoritesArr);
  console.log(favoritesArr.length);

  if (!favoritesArr.length) {
    favoritesPlug.classList.remove('is-hidden');
    if (window.matchMedia('(max-width: 767px)').matches) {
      favImgElem.classList.add('is-hidden');
    }
    return;
  }

  let start = page * cardsPerPage - cardsPerPage + 1;
  let end = page * cardsPerPage;

  renderFavorites(favoritesArr, start, end);
}

// ця не викликається при старті, її імпортне собі Віталій
export function showByCategory(category) {
  favoritesList.innerHTML = '';
  const selectedCategory = category;
  // const selectedCategory = document.querySelector('.active').dataset.id;
  // const selectedCategory = "Dessert"; це була заглушка

  if (selectedCategory === 'All') {
    renderFavorites(favoritesArr);
  } else {
    const filteredFavorites = favoritesArr.filter(
      recipe => recipe.category === selectedCategory
    );
    console.log(filteredFavorites);

    renderFavorites(filteredFavorites);
  }

  //ПОТІМ ВИДАЛИТИ - рендер розмітки всіх улюблених рецептів
  function renderFavorites(data) {
    const markup = data.map(card => DrowCard(card)).join('');
    favoritesList.innerHTML = markup;
  }

  UpdateFavorites();
}

//РЕНДЕР РОЗМІТКИ ВСІХ УЛЮБЕНИХ РЕЦЕПТІВ
// let start = (pageIndex * cardsPerPage - cardsPerPage) + 1;
// let end = pageIndex * cardsPerPage;

export function renderFavorites(data, start, end) {
  for (let i = start; i <= end; i += 1) {
    favoritesList.append(DrawCard(data[i]));
  }
}

//console.log(UpdateFavorites());
//UpdateFavorites();

import { showByCategory } from '../Favorites/Favorites.js';
import { DrawCard } from '../RecepieCards/RecepieCards.js';

const filterBar = document.querySelector('.filters-list');
const favoritesList = document.querySelector('.favorites-list');

const FAV_KEY = 'Favorites';
let getData = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
const recCard = document.querySelector('.recipe-container');

// async function onFetch() {
//   const info = await fetch(`https://tasty-treats-backend.p.goit.global/api/recipes?limit=12`);
//   const parseInfo = await info.json();
//   console.log("fetch", parseInfo.results);
//   localStorage.setItem("fetch", JSON.stringify(parseInfo.results));
//   boxes.insertAdjacentHTML("beforeend", createCards(parseInfo.results));
// }
export function onCardClick() {
  recCard.addEventListener('click', event => {
    if (event.target.nodeName != 'BUTTON') return;
    const getFetch = JSON.parse(localStorage.getItem('fetch'));
    setFavorite(event.target, getFetch);
  });
}

favoritesList.addEventListener('click', event => {
  if (event.target.nodeName != 'IMG') return;
  const getFetch = JSON.parse(localStorage.getItem('fetch'));
  setFavorite(event.target, getFetch);
});

function setFavorite(heart, parseInfo) {
  let id = JSON.parse(localStorage.getItem('id')) || [];
  if (heart.parentElement.classList.contains('add')) {
    const allCards = document.querySelectorAll('.recepie-card');
    allCards.forEach(card => {
      id.forEach(id => {
        if (card.dataset.recipe == id) {
          card.classList.remove('add');
        }
      });
    });
    id = id.filter(num => num != heart.id);
    localStorage.setItem('id', JSON.stringify(id));
    getData = getData.filter(item => item._id != heart.id);
  } else {
    parseInfo.forEach((name, idx) => {
      if (name._id == heart.id) {
        getData.push(parseInfo[idx]);
        id.push(heart.id);
      }
      localStorage.setItem('id', JSON.stringify(id));
      heart.parentElement.classList.add('add');
    });
  }
  localStorage.setItem(FAV_KEY, JSON.stringify(getData));
  favoritesList.innerHTML = DrawCard(getData);
  updateFilterBar();
  updateHearts();
}

updateFavorites();
updateHearts();
updateFilterBar();

function updateFavorites() {
  favoritesList.innerHTML = DrawCard(getData);
}

// ------------сердечка

export function updateHearts() {
  const allCards = document.querySelectorAll('.recepie-card');
  let id = JSON.parse(localStorage.getItem('id'));
  if (id) {
    allCards.forEach(card => {
      id.forEach(id => {
        if (card.dataset.recipe == id) {
          card.classList.add('add');
        }
      });
    });
  }
}

// ------------фільтри

function updateFilterBar() {
  if (!getData || !getData.length) {
    filterBar.innerHTML = '';
  } else {
    filterBar.innerHTML = `<li><button class="filters-btn" type="button" data-id="All">All categories</button></li>`;
    createFilters(getData);
    filterBar.insertAdjacentHTML('beforeend', createFilters(getData));
  }
  const btnActive = localStorage.getItem('btn-active');
  if (btnActive) {
    const allBtns = document.querySelectorAll('.filters-btn');
    allBtns.forEach(btn => {
      if (btn.dataset.recipe == btnActive) {
        showByCategory(btn);
        setActive(btn);
        updateHearts();
      }
    });
  }
}

function createFilters(getData) {
  const filterArr = getData
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

filterBar.addEventListener('click', onClick);
function onClick(evt) {
  if (evt.target.nodeName != 'BUTTON') return;
  setActive(evt.target);
  showByCategory(evt.target);
  updateHearts();
}

function setActive(btn) {
  const allBtns = document.querySelectorAll('.filters-btn');
  allBtns.forEach(btn => btn.classList.remove('active'));
  btn.classList.add('active');
  localStorage.setItem('btn-active', btn.dataset.recipe);
}

import { showByCategory } from '../Favorites/Favorites.js';

const cont = document.querySelector('.recipe-container');
const filterBar = document.querySelector('.filters-list');
const favoritesList = document.querySelector('.favorites-list');
const FAV_KEY = 'Favorites';
const liked = JSON.parse(localStorage.getItem(FAV_KEY)) || [];

//  --------------------Copied-------------
export function onCardClick(recepies) {
  cont.addEventListener('click', event => {
    if (event.target.nodeName != 'svg' && event.target.nodeName != 'path')
      return;
    setFavorite(event.target, recepies);
  });
}

//   --------------------Copied-------------
// onClickFav(liked);
// function onClickFav(recepies) {
//   favoritesList.addEventListener('click', event => {
//     if (event.target.nodeName != 'svg' && event.target.nodeName != 'path')
//       return;
//     setFavorite(event.target, recepies);
//     updateFilterBar();
//     if (!liked || !liked.length) {
//       favoritesList.innerHTML = '';
//     }
//   });
// }

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
console.log(localStorage.getItem('btn-active'));
// updateHearts();
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
export function updateFilterBar() {
  console.log(liked);
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
  console.log(evt.target);
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
  localStorage.setItem('btn-active', btn.dataset.id);
}
console.log(localStorage.getItem('btn-active'));

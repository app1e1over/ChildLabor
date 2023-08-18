import axios from "axios";

const FAV_KEY = 'Favorites';
const favoritesList = document.querySelector('.favorites-list');
const favoritesPlug = document.querySelector('.favorites-plug');
const favTestElem = document.querySelector('.test-cards');
const heartButtonElem = document.querySelector('.heart-button');

//ПОТІМ ВИДАЛИТИ - запит на сервер по всіх рецептах
//і заповнення тестової розмітки, щоб побачити кнопку сердечко
const getData = () => axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes`);
getData().then(
    ({ data }) => {
        console.log(data);
    renderRecepieCard(data)}
).catch(console.warn);

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
    `
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


// функція UpdateFavorites():
// 1. бере інф з ЛС, де зберіг. [ { }-ів ] з рецептами за кл. сл. 'Favorites'
// 1.1. якщо ЛС пустий: рендер заглушки, ретьорн
// 2. filter, для кожного рецепта виклик DrowCard
// 3. innerHTML = renderedCards
const selectedCategory = 'Beef';

function UpdateFavorites() {
    let favoritesArr = JSON.parse(localStorage.getItem(FAV_KEY));
    console.log(favoritesArr);

    if (!favoritesArr.length) {
        favoritesPlug.classList.remove('is-hidden');
        return;
    }

    const filteredFavorites = favoritesArr.filter(
        recepie => recepie.category === selectedCategory
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
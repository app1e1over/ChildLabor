import axios from "axios";
//import img from "./Favorites-img"

const FAV_KEY = 'Favorites';
const favoritesList = document.querySelector('.favorites-list');
const favoritesPlug = document.querySelector('.favorites-plug');
const favTestElem = document.querySelector('.test-cards');
const heartButtonElem = document.querySelector('.heart-button');
const favImgElem = document.querySelector('.fav-picture-thumb');


//ПОТІМ ВИДАЛИТИ - запит на сервер по всіх рецептах
//і заповнення тестової розмітки

const getData = () => axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes`);
getData().then(
    ({ data }) => {
        console.log(data);
        renderRecipeCard(data);
        allRecipesArray = data.results;
}
).catch(console.warn);


//ПОТІМ ВИДАЛИТИ - імітація - рендер розмітки всіх карток 
function renderRecipeCard(data) {
    const cardsArr = data.results;

    const markup = cardsArr.map(card => DrowCard(card)).join('');

    favTestElem.innerHTML = markup;
}


//ПОТІМ ЗАМІНИТИ НА ІМПОРТОВАНУ ФУНКЦІЮ - рендер розмітки одної картки
function DrowCard(card) {

    return `
<div class="recipe-card" id=${card._id}>
    <img src="${card.preview}" alt="${card.tags}" loading="lazy" />
    <div class="recipe-info">
    <h3>${card.title}</h3>
    <p>${card.description}</p>
    </div>
    <button type="button" class="heart-button" id="${card._id}">press heart</button>
</div>
    `
}

// ПРОСТО ВИСИТЬ В КОДІ І ЧЕКАЄ ПУСТИЙ ЛОКАЛ СТОРЕДЖ
export function hadleAllFavoritesDeleted() {
    if (!favoritesArr.length) {
        UpdateFavorites();
    }
}

// функція UpdateFavorites():
// бере інф з ЛС, де зберіг. [ { }-ів ] з рецептами за кл. сл. 'Favorites'
// 1. якщо ЛС пустий: рендер заглушки, ретьорн
// 2. якщо вибрані всі категорії - рендер розмітки всього масиву
// 3. якщо одна категорія - filter, для кожного рецепта виклик DrowCard
// 3. innerHTML = renderedCards

// ВИКЛИКАЄТЬСЯ ПРИ СТАРТІ
export function UpdateFavorites() {
    favoritesPlug.classList.add('is-hidden');
    favImgElem.classList.remove('is-hidden');

    let favoritesArr = JSON.parse(localStorage.getItem(FAV_KEY));
    console.log(favoritesArr);

    if (!favoritesArr.length) {
        favoritesPlug.classList.remove('is-hidden');
        if (window.matchMedia("(max-width: 767px)").matches) {
            favImgElem.classList.add('is-hidden');
        }
        return;
    }

    renderFavorites(favoritesArr);
}

// ця не викликається при старті, її імпортне собі Віталій
export function showByCategory() {
    favoritesList.innerHTML = '';
    //const selectedCategory = document.querySelector('.active').dataset.id;
    const selectedCategory = "Dessert";

    if (selectedCategory === "All") {
        renderFavorites(favoritesArr);
    } else {
    const filteredFavorites = favoritesArr.filter(
        recipe => recipe.category === selectedCategory
    );
    console.log(filteredFavorites);
    renderFavorites(filteredFavorites);
    }
}

//рендер розмітки всіх улюблених рецептів 
function renderFavorites(data) {
    const markup = data.map(card => DrowCard(card)).join('');
    favoritesList.innerHTML = markup;
}

UpdateFavorites();
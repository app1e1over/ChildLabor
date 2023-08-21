import axios from "axios";
import { DrawCard } from "../RecepieCards/RecepieCards.js"


const FAV_KEY = 'Favorites';
const favoritesList = document.querySelector('.favorites-list');
const favoritesPlug = document.querySelector('.favorites-plug');
const favTestElem = document.querySelector('.test-cards');
const favImgElem = document.querySelector('.fav-picture-thumb');


// ПРОСТО ВИСИТЬ В КОДІ І ЧЕКАЄ ПУСТИЙ ЛОКАЛ СТОРЕДЖ
// запускається, коли користувач сидів в обраних і повидаляв усі рецепти
export function hadleAllFavoritesDeleted() {
    if (!favoritesArr.length) {
        UpdateFavorites();
    }
}


// функція UpdateFavorites():
// бере інф з ЛС, де зберіг. [ { }-ів ] з рецептами за кл. сл. 'Favorites'
// 1. якщо ЛС пустий: рендер заглушки, ретьорн
// 2. якщо вибрані всі категорії - рендер розмітки всього масиву
// 3. якщо одна категорія - filter, для кожного рецепта виклик DrawCard
// 3. innerHTML = renderedCards

// ВИКЛИКАЄТЬСЯ ПРИ СТАРТІ
export function UpdateFavorites() {
    favoritesPlug.classList.add('is-hidden');
    favImgElem.classList.remove('is-hidden');

    let favoritesArr = JSON.parse(localStorage.getItem(FAV_KEY));
    // console.log(favoritesArr);

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
    const selectedCategory = document.querySelector('.active').dataset.id;
    // const selectedCategory = "Dessert"; це була заглушка

    if (selectedCategory === "All") {
        renderFavorites(favoritesArr);
    } else {
    const filteredFavorites = favoritesArr.filter(
        recipe => recipe.category === selectedCategory
    );
    // console.log(filteredFavorites);
    renderFavorites(filteredFavorites);
    }
}

//РЕНДЕР РОЗМІТКИ ВСІХ УЛЮБЕНИХ РЕЦЕПТІВ 
function renderFavorites(data) {
    data.map(card => {
        favoritesList.append(DrawCard(card));
    });
}

// UpdateFavorites();
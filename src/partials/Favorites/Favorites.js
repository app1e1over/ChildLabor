import axios from "axios";
import { DrawCard } from "./RecepieCards.js"
import { createPagination } from "./Pagination.js"
import { updateFilterBar } from "./FavoritesFilter.js";

const FAV_KEY = 'Favorites';
const favoritesList = document.querySelector('.favorites-list');
const favoritesPlug = document.querySelector('.favorites-plug');
const favTestElem = document.querySelector('.test-cards');
const favImgElem = document.querySelector('.fav-picture-thumb');


// ПРОСТО ВИСИТЬ В КОДІ І ЧЕКАЄ ПУСТИЙ ЛОКАЛ СТОРЕДЖ
// запускається, коли користувач сидів в обраних і повидаляв усі рецепти
export function hadleAllFavoritesDeleted() {
    if (!favoritesArr.length) {
        UpdateFavorites({page: 1});
    }

}

// функція UpdateFavorites():
// бере інф з ЛС, де зберіг. [ { }-ів ] з рецептами за кл. сл. 'Favorites'
// 1. якщо ЛС пустий: рендер заглушки, ретьорн
// 2. якщо вибрані всі категорії - рендер розмітки всього масиву
// 3. якщо одна категорія - filter, для кожного рецепта виклик DrawCard
// 3. innerHTML = renderedCards


// функція UpdateFavorites():
// бере інф з ЛС, де зберіг. [ { }-ів ] з рецептами за кл. сл. 'Favorites'
// 1. якщо ЛС пустий: рендер заглушки, ретьорн
// 2. якщо вибрані всі категорії - рендер розмітки всього масиву
// 3. якщо одна категорія - filter, для кожного рецепта виклик DrawCard
// 3. innerHTML = renderedCards

// let pageIndex = 1;
const cardsPerPage = 12;
export function StartFavorites(){
    let favoritesArr = JSON.parse(localStorage.getItem(FAV_KEY));
    let pageCount = Math.ceil(favoritesArr.length / cardsPerPage);
    UpdateFavorites({page: 1})
    
    if (favoritesArr.length > cardsPerPage) {
    createPagination(pageCount, 1, UpdateFavorites);
    }
}
// ВИКЛИКАЄТЬСЯ ПРИ СТАРТІ
export function UpdateFavorites({ page }) {
    favoritesList.innerHTML = '';
    favoritesPlug.classList.add('is-hidden');
    favImgElem.classList.remove('is-hidden');

    let favoritesArr = JSON.parse(localStorage.getItem(FAV_KEY));
    //console.log(favoritesArr);
    //console.log(favoritesArr.length);


    if (!favoritesArr.length) {

        favoritesPlug.classList.remove('is-hidden');
        if (window.matchMedia("(max-width: 767px)").matches) {
            favImgElem.classList.add('is-hidden');
        }
        return;
    }
    
    let start = (page * cardsPerPage - cardsPerPage);
    let end = page * cardsPerPage;
    updateFilterBar();

    renderFavorites(favoritesArr, start, end);
}


// ця не викликається при старті, її імпортне собі Віталій
export function showByCategory(category) {
    let favoritesArr = JSON.parse(localStorage.getItem(FAV_KEY));
    favoritesList.innerHTML = '';
    const selectedCategory = category;
    // const selectedCategory = document.querySelector('.active').dataset.id;
    // const selectedCategory = "Dessert"; це була заглушка

    if (selectedCategory === "All") {
        renderFavorites(favoritesArr, start, end);
    } else {
    const filteredFavorites = favoritesArr.filter(
        recipe => recipe.category.trim().toLowerCase() === selectedCategory.dataset.id.trim().toLowerCase() || selectedCategory.dataset.id == "All"
    );
    // console.log(filteredFavorites);
    let page = 1;
    let start = (page * cardsPerPage - cardsPerPage);
    let end = page * cardsPerPage;
        
    renderFavorites(filteredFavorites, start, end);
    }
}

//РЕНДЕР РОЗМІТКИ ВСІХ УЛЮБЕНИХ РЕЦЕПТІВ 

// let start = (pageIndex * cardsPerPage - cardsPerPage) + 1;
// let end = pageIndex * cardsPerPage;

export function renderFavorites(data, start, end) {
    for (let i = start; i <= end && i < data.length; i += 1 ){
        favoritesList.append(DrawCard(data[i]));
    }
}


//console.log(UpdateFavorites());
//UpdateFavorites();

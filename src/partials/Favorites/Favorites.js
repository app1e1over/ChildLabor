import axios from "axios";
//import img from "./Favorites-img"

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
        renderRecipeCard(data);
        allRecipesArray = data.results;
}
).catch(console.warn);


//ПОТІМ ВИДАЛИТИ - імітація - рендер розмітки всіх карток 
function renderRecipeCard(data) {
    const cardsArr = data.results;

    const markup = cardsArr.map(card => DrowCard(card)).join('');

    favTestElem.innerHTML = markup;

    //localStorage.setItem(FAV_KEY, JSON.stringify(cardsArr));
}



//ПОТІМ ВИДАЛИТИ - рендер розмітки одної картки
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

//ПОТІМ ВИДАЛИТИ - метод addToFavorites, який додає в обрані:
// 1. додає рецепт в ЛС (пушить в масив);
// 2. міняє колір сердечка;
// 3. не викликає UpdateFavorites, а DrowCard, <> insertAdjasentHTML(beforeend, newCard)
// function addToFavorites() {
//     heartButtonElem.classList.add('is-favorite');

//     const selectadRecipe = heartButtonElem.parentNode;
//     console.log(selectadRecipe);
// }

//ПОТІМ ВИДАЛИТИ - метод removeFromFavorites, який видаляє з обраних:
// 1. видаляє рецепт з ЛС;
// 2. міняє колір сердечка;
// 3. викликає UpdateFavorites

// СЛУХАЧ ДЛЯ СЕРДЕЧОК
let favoritesArray = [] || JSON.parse(localStorage.getItem(FAV_KEY));
//localStorage.setItem(FAV_KEY, JSON.stringify(favoritesArray));

document.addEventListener('click', (event) => {
    console.log(event.target);
if (event.target.classList.contains("heart-button")) { // якщо є клас...
    console.log('you win');
    console.log(event.target.parentNode);
    console.log(event.target.id);
    const favId = event.target.id;

    getData().then(
    ({ data }) => {
        console.log(data.results);
        const favRecipe = data.results.find(result => result._id === favId);
        console.log(favRecipe);
        favoritesArray.push(favRecipe);
        console.log(favoritesArray);
        localStorage.setItem(FAV_KEY, JSON.stringify(favoritesArray));
    }
    ).catch(console.warn);
    
    } 
})

//localStorage.removeItem(FAV_KEY);


// функція UpdateFavorites():
// 1. бере інф з ЛС, де зберіг. [ { }-ів ] з рецептами за кл. сл. 'Favorites'
// 1.1. якщо ЛС пустий: рендер заглушки, ретьорн
// 2. filter, для кожного рецепта виклик DrowCard
// 3. innerHTML = renderedCards


const selectedCategory = 'Beef';

// ВИКЛИКАЄТЬСЯ ПРИ СТАРТІ
export function UpdateFavorites() {
    let favoritesArr = JSON.parse(localStorage.getItem(FAV_KEY));
    console.log(favoritesArr);

    if (!favoritesArr.length) {
        favoritesPlug.classList.remove('is-hidden');
        return;
    }

    const filteredFavorites = favoritesArr.filter(
        recipe => recipe.category === selectedCategory
    );
    console.log(filteredFavorites);

    renderFavorites(filteredFavorites);
}

//рендер розмітки всіх улюблених рецептів 
function renderFavorites(data) {
    const markup = data.map(card => DrowCard(card)).join('');
    favoritesList.innerHTML = markup;
}

UpdateFavorites();
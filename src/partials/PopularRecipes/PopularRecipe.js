import axios from 'axios';
import { ModalStart, addModal } from './ModalWindow';

const popularRecipesList = document.querySelector('.popular-recipes-container');
const popularRecipesApiUrl = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

async function fetchPopularRecipes() {
  try {
    const response = await axios.get(popularRecipesApiUrl);
    const recipes = response.data;

    let markup = '';

    recipes.forEach(recipe => {
      const { _id, preview, title, description } = recipe;
      const cont = document.createElement("div")
      cont.className = "popular-recipes-list";
      cont.dataset.recipe = _id;
      addModal(cont, 'recipe')

      console.log(_id);

      cont.innerHTML = `
          <img src="${preview}" alt="${title}" class="popular-recipe-image">
          <div class="popular-recipes-content">
            <div class="popular-recipe-item-title">${title}</div>
            <div class="popular-recipe-description">${description}</div>
          </div>
        
      `;
      popularRecipesList.appendChild(cont);
    });

    // popularRecipesList.insertAdjacentHTML('beforeend', markup);
    ModalStart();
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

export default fetchPopularRecipes;

// // Додаємо прослуховувач
// popularRecipesList.addEventListener('click', async event => {
//   // перевіряємо клік по елементу з класом 'popular-recipes-list'
//   if (event.target.classList.contains('popular-recipes-list')) {
//     // отримуємо recipeID
//     const recipeID = event.target.getAttribute('data-recipe-id');

//     // виконуємо запит на API для отримання даних про рецепт по recipeID
//     try {
//       const response = await axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes/${recipeID}`);
//       const recipeData = response.data;

//       // викликаємо функцію відкриття модального вікна, коли воно буде
//       openModal(recipeData);
//     } catch (error) {
//       console.error('Помилка:', error);
//     }
//   }
// });

import axios from 'axios';

const popularRecipesList = document.querySelector('.popular-recipes-container');
const popularRecipesApiUrl = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

async function fetchPopularRecipes() {
  try {
    const response = await axios.get(popularRecipesApiUrl);
    const recipes = response.data;

    let markup = '';

    recipes.forEach(recipe => {
      const { preview, title, description } = recipe;

      markup += `
        <div class="popular-recipes-list">
          <img src="${preview}" alt="${title}" class="popular-recipe-image">
          <div class="popular-recipes-content">
            <div class="popular-recipe-item-title">${title}</div>
            <div class="popular-recipe-description">${description}</div>
          </div>
        </div>
      `;
    });

    popularRecipesList.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

fetchPopularRecipes();
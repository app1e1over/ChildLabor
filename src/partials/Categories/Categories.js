import { Update } from '../RecepieCards/RecepieCards.js';

const categoriesContainer = document.getElementById('categories');
    


const butCateg = document.querySelector('.my-button');
const optionCateg = document.querySelector('.category-option');



export function startCategories() {
  fetch('https://tasty-treats-backend.p.goit.global/api/categories')
        .then(response => response.json())
        .then(data => {
            // Створення кнопок для кожної категорії
            data.forEach(category => {
                const button = document.createElement('option');
                button.value = categoriesContainer.value;
                button.textContent = category.name;
                button.classList.add('category-option');
                // Додавання кнопки до контейнера
                categoriesContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Помилка отримання даних з бекенду:', error);
        });
    
    const blokCat = categoriesContainer.addEventListener('change', () => {
        Update({ category: categoriesContainer.options[categoriesContainer.selectedIndex].text });
        categoriesContainer.blur();
});
    
    butCateg.addEventListener("click", function () {
        Update({ category: "" });
        categoriesContainer.value = "";// присвоюємо пусту строку значенню селекту
        categoriesContainer.selectedIndex = -1;

});
}


 





 

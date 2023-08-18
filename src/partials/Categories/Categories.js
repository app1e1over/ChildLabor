
import { Update } from './RecepieCards/RecepieCards.js';



const categoriesContainer = document.getElementById('categories');
    fetch('https://tasty-treats-backend.p.goit.global/api/categories')
        .then(response => response.json())
        .then(data => {
            // Створення кнопок для кожної категорії
            data.forEach(category => {
                const button = document.createElement('option');
                button.value = category.name;
                button.textContent = category.name;
                button.classList.add('category-option');
                // Додавання обробника подій для кнопки
                button.addEventListener('click', () => {
                    // Виконання дій при натисканні на кнопку
                    console.log('Ви натиснули на категорію:', category.name);
                });
                // Додавання кнопки до контейнера
                categoriesContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Помилка отримання даних з бекенду:', error);
        });


       const butCateg = document.querySelector('.my-button');
       const clAllCateg = butCateg.addEventListener('click', onStart);
            

            const blokCat = categoriesContainer.addEventListener('change', () => {
                Update();
                //очистити фільтри
            document.getElementById("time").value = "";
            document.getElementById("area").value = "";
            document.getElementById("ingridients").value = "";
            document.getElementById("search").value = "";

                });

/*function onStart() {
    Update();
            };*/

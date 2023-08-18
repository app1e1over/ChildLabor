 const categoriesContainer = document.getElementById('categories');
    fetch('https://tasty-treats-backend.p.goit.global/api/categories')
        .then(response => response.json())
        .then(data => {
            // Створення кнопок для кожної категорії
            data.forEach(category => {
                const button = document.createElement('option');
                button.value = category.name;
                button.textContent = category.name;
                button.classList.add('category-button');
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
            const blokCat = blokCategories.addEventListener('click', onSelectBreed);

function onStart() {
    Update();

            };

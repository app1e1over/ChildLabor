
const categoriesContainer = document.getElementById('categories');
    


const butCateg = document.querySelector('.my-button');
const optionCateg = document.querySelector('.category-option');

const blokCat = categoriesContainer.addEventListener('change', () => {
    Update();
    console.log('Ви натиснули на категорію:', category.name);
});

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
    
    butCateg.addEventListener("click", function () {
categoriesContainer.value = ""; // присвоюємо пусту строку значенню селекту
});
}


 
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const header = document.querySelector("header");

// Визначення видимості хедера
function isHeaderVisible() {
  let headerRect = header.getBoundingClientRect();
  let headerBottom = headerRect.bottom || headerRect.y + headerRect.height;
  return headerBottom > 0;
}

// Показати або приховати кнопку при прокрутці
window.addEventListener("scroll", function() {
  if (isHeaderVisible()) {
    scrollToTopBtn.classList.remove("show");
  } else {
    scrollToTopBtn.classList.add("show");
  }
});

// Прокрутка до верху при натисканні кнопки
scrollToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});     




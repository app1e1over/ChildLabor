import debounce from 'lodash/debounce';
import axios from 'axios'; 
import SlimSelect from 'slim-select'
 
import {showPreloader, hidePreloader} from "../Preloader/Preloader"
import {Update} from "../RecepieCards/RecepieCards"

const form = document.querySelector(".search-form-food")
const ingredients = document.getElementById('selectIng');
const area = document.getElementById('selectCountry');
const time = document.getElementById('selectTime');
const input = document.querySelector('.search');
const clearInputSvg = document.querySelector('.for-svg');
const resetBtn = document.querySelector(".btn-reset-container")

let ingredientsId;

let ingredientsData;
let areas;

let selectedIngredientId =0;
let selectedCountryId = 0;
let keyWord ='';

/// см.функция на 130стр, сам урл на 167
let t = ''; // время
let c = ''; // страна
let p = ''; // ингридиент


let url;



// фетчим ингридиенты
function fetchIng (){
  showPreloader()
   axios.get('https://tasty-treats-backend.p.goit.global/api/ingredients')
.then(response => {
//console.log(data) // тут можно посмотреть ингридиенты
const data = response.data;
ingredientsData = data;
createIngList(ingredientsData);
 
})
.catch(error => {
  console.error('Ошибка запроса:', error);
}).finally(() => {
  hidePreloader();
}) }



// фетчим страны
function fetchArea () {
  showPreloader();
  axios.get('https://tasty-treats-backend.p.goit.global/api/areas')
.then(response => {
//console.log(data) // тут можно посмотреть страны 
const data = response.data;
 areas = data;
createAreaList(areas);
 
})
.catch(error => {
  console.error('Ошибка запроса:', error);
}).finally(() => {
  hidePreloader();
})  }


// делаем список ингридиентов
function createIngList(ingredientsData) {
  const selectElementIng = ingredients;

  
  ingredientsData.forEach(ingridient => {
    const optionElement = document.createElement('option');
    optionElement.value = ingridient.name;
    ingredientsId = ingridient._id;
    optionElement.textContent = ingridient.name;
    selectElementIng.appendChild(optionElement);
  });
  new SlimSelect({
    select: '#selectIng',
    settings: {
      showSearch: false,
      searchHighlight: true,
      openPosition: 'down'
    
    }
  })
}

// делаем список стран
function createAreaList(areas) {
  const selectElementArea = area;

  areas.forEach(area => {
    const optionElement = document.createElement('option');
    optionElement.value = area.name;
    optionElement.textContent = area.name;
    selectElementArea.appendChild(optionElement);
  });
  new SlimSelect({
    select: '#selectCountry',
    settings: {
      showSearch: false,
      searchHighlight: true,
      openPosition: 'down'
    
    }
  })
}
// делаем выбор времени
function doTime (){
  const selectElementTime = time;
  for(let i=5; i<=120; i+=5 ){
    const optionElement = document.createElement('option');
    optionElement.value = i;
    optionElement.textContent = i;
    selectElementTime.appendChild(optionElement); 
  }
  new SlimSelect({
    select: '#selectTime',
    settings: {
      showSearch: false,
      searchHighlight: true,
      openPosition: 'down'
    
    }
  })
}




// добавляем слушателей на все поля
function addListeners() {
ingredients.addEventListener("change", takeIng)
time.addEventListener("change", takeIng)
area.addEventListener("change", takeIng)
input.addEventListener("input",debounce(inputsSearching, 300))
clearInputSvg.addEventListener("mousedown",  clearInput);
resetBtn.addEventListener("click", resetFltr)
}
function resetFltr(){
  time.value = "",
  area.value = "",
  ingredients.value = "",
  Update({time:"", area:"", ingredient:""})
}
function clearInput() {
  
    input.value = ''; // Очищаем значение input
    
};




// поиск на инпуте

function inputsSearching(e){

keyWord = e.target.value.trim(); 
//console.log(keyWord)
// фетчим рецепты
Update({}, keyWord)
 

}

function searchByKeyword(keyWord, recipes) {
  const matchingIds = []; // сюда будут записываться ид рецептов, которые совпадают по тегу
recipes.results.forEach(recipe => {
    const hasKeyword = recipe.tags.some(tag => tag.toLowerCase().includes(keyWord.toLowerCase())); //тут мы ищем ключевое слово в тегах
    if (hasKeyword) {
      matchingIds.push(recipe._id); // если находим, пушим ид рецепта, в котором нашли
    }
  });
//console.log(matchingIds) // смотрим, что у нас получилось (тут ид рецептов у которых есть теги)
  return matchingIds; // и возвращаем массив ид рецептов у которых в тегах есть ключевое слово из инпута
}


// функция на слушателя

  function takeIng(e) {
    try {
      const updatedData = {}; 
      updatedData[e.target.name] = e.target.value; 
      Update(updatedData); 
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  
function selects(){
  addListeners();
fetchIng ();
fetchArea ();
doTime ();}

export {selects};
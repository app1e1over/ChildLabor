import debounce from 'lodash/debounce';
import axios from 'axios'; 
import SlimSelect from 'slim-select'
 
import {showPreloader, hidePreloader} from "../Preloader/Preloader"

const form = document.querySelector(".search-form-food")
const selectIng = document.getElementById('selectIng');
const selectCountry = document.getElementById('selectCountry');
const selectTime = document.getElementById('selectTime');
const input = document.querySelector('.search')
let ingredientsId;

let ingredients;
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
 ingredients = data;
createIngList(ingredients);
 
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
function createIngList(ingredients) {
  const selectElementIng = selectIng;

  
  ingredients.forEach(ingridient => {
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
  const selectElementArea = selectCountry;

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
  const selectElementTime = selectTime;
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
selectIng.addEventListener("change", takeIng)
selectTime.addEventListener("change", takeIng)
selectCountry.addEventListener("change", takeIng)
input.addEventListener("input",debounce(inputsSearching, 300))}

new SlimSelect({
  select: input,
  settings: {
    showSearch: false,
    searchHighlight: true,
    openPosition: 'down'
  }
});

// поиск на инпуте

function inputsSearching(e){

keyWord = e.target.value.trim(); 
console.log(keyWord)
// фетчим рецепты
axios.get('https://tasty-treats-backend.p.goit.global/api/recipes?page=1&limit=250') // почему лимит 250? хз, чтобы много. не знаю, как сделать все
.then(response => {
  const data = response.data;
  let recipes = data;
  //console.log(recipes) // тут можно посмотреть все, что пришло
  searchByKeyword(keyWord, recipes)
})
.catch(error => {
  console.error('Ошибка запроса:', error);
});  

}

function searchByKeyword(keyWord, recipes) {
  const matchingIds = []; // сюда будут записываться ид рецептов, которые совпадают по тегу
recipes.results.forEach(recipe => {
    const hasKeyword = recipe.tags.some(tag => tag.toLowerCase().includes(keyWord.toLowerCase())); //тут мы ищем ключевое слово в тегах
    if (hasKeyword) {
      matchingIds.push(recipe._id); // если находим, пушим ид рецепта, в котором нашли
    }
  });
console.log(matchingIds) // смотрим, что у нас получилось (тут ид рецептов у которых есть теги)
  return matchingIds; // и возвращаем массив ид рецептов у которых в тегах есть ключевое слово из инпута
}


// функция на слушателя
function takeIng(e){
  //console.log(e.target.value) 
 // console.log(e.target)
try {
  if (e.target.name === "country"){
  
   const selectedCountrytName = e.target.value;
    
    // ищем выбранную страну из всех стран
   let selectedCountry = areas.find(country => country.name === selectedCountrytName);
   // если нашли, выводим ид
    if (selectedCountry) {
    selectedCountryId = selectedCountry._id;
   // console.log( selectedCountryId); // тут консолим ид страны
    c = `&area=${selectedCountryId};`
    }
  }
  else if(e.target.name === "selectIngridients"){
    if (e.target.name === "selectIngridients") {
      const selectedIngredientName = e.target.value;
      
      // ищем выбранный ингридиент из всех ингридиентов
     let selectedIngredient = ingredients.find(ingridient => ingridient.name === selectedIngredientName);
      // если нашли, выводим его ид
      if (selectedIngredient) {
         selectedIngredientId = selectedIngredient._id;
       // console.log(selectedIngredientId); // тут консолим ид ингридиента
        p = `&ingredients=${selectedIngredientId}`;
      }
    }
  }
  else if ((e.target.name === "time")){
    const selectedTimeName = e.target.value; // записали выбранное время
    t = `&time=${selectedTimeName}`;
  }}
  finally {
    url = `https://tasty-treats-backend.p.goit.global/api/recipes?category=Beef&page=1&limit=6${t}${c}${p}`;
    console.log(url) // смотрим, все ли есть, что должно быть
  }

 return url;
}
function selects(){
  addListeners();
fetchIng ();
fetchArea ();
doTime ();}

export {selects};
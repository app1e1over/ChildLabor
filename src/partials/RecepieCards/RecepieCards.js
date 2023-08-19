import axios from 'axios';
function padEndRating(subj) {
  subj = subj.toString();
  if( subj.length===1){
    return subj+'.0';
  }else{
    if(subj.length>3){
      return subj.slice(0, 3);
    }
  }
  return subj;
}
export function Update() {
  let req = MakeRequestString();
  console.log(req);
  let cont = document.querySelector('.recipe-container');
  axios
    .get(req)
    .then(v => v.data.results)
    .then(recepies => {
      for (let recipe of recepies) {
        cont.append(DrawCard(recipe));
      }
    });
}
function DrawCard(recipe) {
  let cont = document.createElement('div');
  cont.classList.add('recipe-card-container');

  //creating background image
  let bg = document.createElement('img');
  bg.src = recipe.thumb;
  bg.classList.add('recipe-card-bg');

  let wrap = document.createElement("div");
  wrap.classList.add("recipe-card-wrap");

  let textContainer = document.createElement("div");
  textContainer.classList.add("recipe-card-text")
  let name = document.createElement('p');
  name.classList.add('recipe-card-title');
  name.innerText = recipe.title;

  let description = document.createElement('p');
  description.classList.add('recipe-card-description');
description.innerText=recipe.description;

  let like = document.createElement("button");
  like.classList.add("heart-button");
  like.classList.add("recipe-card-like-btn");
  like.innerText="like";


  let lowerContainer = document.createElement("div");
  lowerContainer.classList.add("recipe-card-lower-container");


  let rating = document.createElement("div");
  rating.classList.add("recipe-card-rating");
  rating.innerText=padEndRating(recipe.rating);
  for(let i=1;i<=5; i++){
    let svg = document.createElement("img");
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    svg.src = "../../image/sprite.svg"
    rating.appendChild(svg);
  }
  lowerContainer.appendChild(rating);

  let seeRecep = document.createElement("button");
  seeRecep.classList.add("recipe-card-see-recipe")
seeRecep.innerText = "See recipe"
lowerContainer.appendChild(seeRecep);

  cont.appendChild(bg);
  textContainer.appendChild(name);
  textContainer.appendChild(description);
  cont.appendChild(like);

  wrap.appendChild(textContainer);
  wrap.appendChild(lowerContainer);

  cont.appendChild(wrap);
  return cont;
}
function MakeRequestString() {
  const selectIngredients = document.getElementById('selectIng');
  const selectCountry = document.getElementById('selectCountry');
  const selectTime = document.getElementById('selectTime');
  const search = document.querySelector('.search');
  const category = document.getElementById('categories');
  const paginator = document.getElementById('pagination');
  let obj = {
    category: category,
    page: paginator,
    time: selectTime,
    area: selectCountry,
    ingredients: selectIngredients,
  };
  let first = true;

  let str = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  for (let key in obj) {
    if (obj[key] != undefined && obj[key].value != undefined) {
      if (!first) {
        str += '&';
      } else {
        str += '?';
        first = false;
      }
      str += key + '=' + obj[key].value;
    }
  }
  return str;
}
Update();

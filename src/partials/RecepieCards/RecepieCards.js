import axios from 'axios';

export function Update() {
  let req = MakeRequestString();
  console.log(req);
  let cont = document.querySelector('.recepy-container');
  axios
    .get(req)
    .then(v => v.data.results)
    .then(recepies => {
      for (let recepy of recepies) {
        cont.append(DrawCard(recepy));
      }
    });
}
function DrawCard(recepy) {
  console.log(recepy);
  let cont = document.createElement('div');
  cont.classList.add('recepy-card-container');

  //creating background image
  let bg = document.createElement('img');
  bg.src = recepy.thumb;
  bg.classList.add('recepy-card-bg');

  let textContainer = document.createElement("div");
  textContainer.classList.add("recepy-card-text")
  let name = document.createElement('p');
  name.classList.add('recepy-card-title');
  name.innerText = recepy.title;

  let description = document.createElement('p');
  description.classList.add('recepy-card-description');
description.innerText=recepy.description;

  cont.appendChild(bg);
  textContainer.appendChild(name);
  textContainer.appendChild(description);
  cont.appendChild(textContainer);
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

import axios from 'axios';
import { sprite } from '../../image/sprite.svg';
import { ModalStart } from '../ModalWindow/ModalWindow';
import { createPagination } from "../Pagination/Pagination.js";

import {showPreloader, hidePreloader} from "../Preloader/Preloader"
function padEndRating(subj) {
  subj = subj.toString();
  if (subj.length === 1) {
    return subj + '.0';
  } else {
    if (subj.length > 3) {
      return subj.slice(0, 3);
    }
  }
  return subj;
}

function makeStar(active) {
  let res;
  if (active) {
    res = makeSvg(`${sprite}#icon-star-active`, 'recepie-card-star');
  } else {
    res = makeSvg(`${sprite}/icon-unactive-star`, 'recepie-card-star');
  }
  res.setAttribute('width', '18');
  res.setAttribute('height', '18');
  return res;
}

function makeSvg(src, clas) {
  let svg = document.createElement('svg');

  svg.className = clas;
  svg.innerHTML = `<use href="${src}"></use>`;
  return svg;
}
const filterObj = {};
export function Update(obj) {
  for(key in obj){
    filterObj[key] = obj[key];
    console.log(filterObj[key]);

  }
  let req = MakeRequestString();
  console.log(req);
  let cont = document.querySelector('.recipe-container');
  cont.innerHTML = "";
  axios
    .get(req)
    .then(v => {
      if(!obj.hasOwnProperty("page"))
        createPagination(v.data.totalPages, 1);
      return v.data.results;})
    .then(recepies => {
      
      showPreloader();
      for (let recipe of recepies) {
        cont.append(DrawCard(recipe));
      }
    }).finally(()=>{
      hidePreloader();
      ModalStart();
    });
}
export function DrawCard(recipe) {
  let cont = document.createElement('div');
  cont.classList.add('recipe-card-container');

  //creating background image
  let bg = document.createElement('img');
  bg.src = recipe.thumb;
  bg.classList.add('recipe-card-bg');

  let wrap = document.createElement('div');
  wrap.classList.add('recipe-card-wrap');

  let textContainer = document.createElement('div');
  textContainer.classList.add('recipe-card-text');
  let name = document.createElement('p');
  name.classList.add('recipe-card-title');
  name.innerText = recipe.title;

  let description = document.createElement('p');
  description.classList.add('recipe-card-description');
  description.innerText = recipe.description;

  let like = document.createElement('button');
  like.classList.add('heart-button');
  like.classList.add('recipe-card-like-btn');

  like.innerHTML = `<svg class="heart"><path fill="none" opacity="0.5" stroke="#f8f8f8" style="stroke: var(--color1, #f8f8f8)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.9091" d="M15.99 6.848c-2.665-3.117-7.111-3.956-10.451-1.101-3.34 2.854-3.811 7.625-1.187 11.001 2.182 2.806 8.781 8.724 10.944 10.64 0.241 0.214 0.364 0.321 0.503 0.364 0.057 0.017 0.123 0.028 0.191 0.028s0.133-0.010 0.195-0.029l-0.005 0.001c0.143-0.042 0.262-0.15 0.505-0.364 2.163-1.916 8.764-7.834 10.944-10.64 2.623-3.375 2.211-8.177-1.187-11.001-3.398-2.825-7.786-2.016-10.452 1.101z"></path></svg>`;
  let lowerContainer = document.createElement('div');
  lowerContainer.classList.add('recipe-card-lower-container');

  let rating = document.createElement('div');
  rating.classList.add('recipe-card-rating');
  rating.innerText = padEndRating(recipe.rating);
  for (let i = 1; i <= 5; i++) {
    if (Math.floor(recipe.rating - i) >= 0) {
      rating.appendChild(makeStar(true));
    } else {
      rating.appendChild(makeStar(false));
    }
  }
  lowerContainer.appendChild(rating);

  let seeRecep = document.createElement('div');
  seeRecep.classList.add('recipe-card-see-recipe');
  seeRecep.innerText = 'See recipe';
  seeRecep.dataset.action="open-modal";
  lowerContainer.appendChild(seeRecep);

  cont.appendChild(bg);
  textContainer.appendChild(name);
  textContainer.appendChild(description);
  cont.appendChild(like);

  wrap.appendChild(textContainer);
  wrap.appendChild(lowerContainer);

  cont.appendChild(wrap);

  cont.dataset.recipe = recipe._id;

  return cont;
}

function MakeRequestString() {
  let first = true;
  let obj = filterObj;
  let str = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  for (let key in obj) {
    if (obj[key] != undefined && obj[key] != null) {
      let val = obj[key];
      
      if (val != undefined && val.trim() != '') {
        if (!first) {
          str += '&';
        } else {
          str += '?';
          first = false;
        }
        str += key + '=' + val;
      }
    }
  }
  return str;
}
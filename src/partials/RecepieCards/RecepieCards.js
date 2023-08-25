import axios from 'axios';
import { sprite } from '../../image/sprite.svg';
  import { ModalStart, addModal } from '../ModalWindow/ModalWindow';
import { createPagination } from '../Pagination/Pagination.js';
import { showPreloader, hidePreloader } from '../Preloader/Preloader';

export function padEndRating(subj) {
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
const activeHeart = `<svg class="heart"><path fill="#f8f8f8" opacity="1" stroke="#f8f8f8" style="stroke: var(--color1, #f8f8f8)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.9091" d="M15.99 6.848c-2.665-3.117-7.111-3.956-10.451-1.101-3.34 2.854-3.811 7.625-1.187 11.001 2.182 2.806 8.781 8.724 10.944 10.64 0.241 0.214 0.364 0.321 0.503 0.364 0.057 0.017 0.123 0.028 0.191 0.028s0.133-0.010 0.195-0.029l-0.005 0.001c0.143-0.042 0.262-0.15 0.505-0.364 2.163-1.916 8.764-7.834 10.944-10.64 2.623-3.375 2.211-8.177-1.187-11.001-3.398-2.825-7.786-2.016-10.452 1.101z"></path></svg>`;
const inactiveHeart = `<svg class="heart"><path fill="none" opacity="1" stroke="#f8f8f8" style="stroke: var(--color1, #f8f8f8)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.9091" d="M15.99 6.848c-2.665-3.117-7.111-3.956-10.451-1.101-3.34 2.854-3.811 7.625-1.187 11.001 2.182 2.806 8.781 8.724 10.944 10.64 0.241 0.214 0.364 0.321 0.503 0.364 0.057 0.017 0.123 0.028 0.191 0.028s0.133-0.010 0.195-0.029l-0.005 0.001c0.143-0.042 0.262-0.15 0.505-0.364 2.163-1.916 8.764-7.834 10.944-10.64 2.623-3.375 2.211-8.177-1.187-11.001-3.398-2.825-7.786-2.016-10.452 1.101z"></path></svg>`;

const filterObj = {};
export function Update(obj, keyword){ 
  
  for (let key in obj) {
    filterObj[key] = obj[key];
  }
  let req = MakeRequestString();
  let cont = document.querySelector('.recipe-container');
  cont.innerHTML = '';
  axios
    .get(req)
    .then(v => {
      if (!obj.hasOwnProperty('page')) createPagination(v.data.totalPages, 1, Update);
      return v.data.results;
    })
    .then(recepies => {
      showPreloader();
      cont.innerHTML = "";
      for (let recipe of recepies) {
        if(keyword==undefined || recipe.title.includes(keyword) || recipe.description.includes(keyword))
        cont.append(DrawCard(recipe));
      }
    })
    .finally(() => {
      hidePreloader();
      //ModalStart();
    });
}
const liked = JSON.parse(localStorage.getItem('Favorites')) || [];
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

  if (liked!=null && !liked.filter(l => l._id == recipe._id).length > 0)
    like.innerHTML = inactiveHeart;
  else
    like.innerHTML = activeHeart;
  
Like(like, recipe);

  let lowerContainer = document.createElement('div');
  lowerContainer.classList.add('recipe-card-lower-container');

  let rating = document.createElement('div');
  rating.classList.add('recipe-card-rating');
  rating.innerText = padEndRating(recipe.rating);
  for (let i = 1; i <= 5; i++) {
    if (Math.floor(recipe.rating - i) >= 0) {
      rating.innerHTML +=
        '<svg class="recipe-card-star" width="18" height="18"><path fill="#eea10c" d="M13.826 3.262c.686-2.105 3.664-2.105 4.347 0l1.931 5.943a2.292 2.292 0 0 0 2.174 1.582h6.251c2.215 0 3.134 2.834 1.344 4.135l-5.058 3.673a2.287 2.287 0 0 0-.825 2.572l-.005-.016 1.931 5.945c.686 2.105-1.726 3.858-3.518 2.555l-5.056-3.673c-.372-.273-.839-.437-1.344-.437s-.972.164-1.35.441l.006-.004-5.056 3.673c-1.792 1.303-4.201-.45-3.518-2.555l1.931-5.943a2.282 2.282 0 0 0-.823-2.553l-.006-.004-5.058-3.673c-1.79-1.303-.869-4.137 1.344-4.137h6.251a2.287 2.287 0 0 0 2.167-1.561l.005-.016 1.934-5.943z" style="fill:var(--color5, #eea10c)"/></svg>';
    } else {
      rating.innerHTML +=
        '<svg class="recipe-card-star" width="18" height="18"><path fill="#f8f8f8" d="M13.826 3.262c.686-2.105 3.664-2.105 4.347 0l1.931 5.943a2.292 2.292 0 0 0 2.174 1.582h6.251c2.215 0 3.134 2.834 1.344 4.135l-5.058 3.673a2.287 2.287 0 0 0-.825 2.572l-.005-.016 1.931 5.945c.686 2.105-1.726 3.858-3.518 2.555l-5.056-3.673c-.372-.273-.839-.437-1.344-.437s-.972.164-1.35.441l.006-.004-5.056 3.673c-1.792 1.303-4.201-.45-3.518-2.555l1.931-5.943a2.282 2.282 0 0 0-.823-2.553l-.006-.004-5.058-3.673c-1.79-1.303-.869-4.137 1.344-4.137h6.251a2.287 2.287 0 0 0 2.167-1.561l.005-.016 1.934-5.943z" style="fill:var(--color5, #f8f8f8)"/></svg>';
    }
  }
  lowerContainer.appendChild(rating);

  let seeRecep = document.createElement('button');
  seeRecep.classList.add('recipe-card-see-recipe');
  seeRecep.classList.add('button');
  seeRecep.innerText = 'See recipe';
  seeRecep.dataset.action = 'open-modal';
  lowerContainer.appendChild(seeRecep);
  addModal(seeRecep, "recipe");
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
  let obj = filterObj;
  let lim=4;
  if(screen.width>=768){
    lim=8;
  }
  if(screen.width>=1279){
    lim=9;
  }
  let str = 'https://tasty-treats-backend.p.goit.global/api/recipes?limit='+lim;
  for (let key in obj) {
    if (obj[key] != undefined && obj[key] != null) {
      let val = obj[key];

      if (typeof val=="number" || val.trim() != '') {
          str += '&';
     
        str += key + '=' + val;
      }
    }
  }
  return str;
}

export function Like(el, recep, change){
  if(el==null || el==undefined){
    return;
  }
  el.addEventListener('click',()=>{
    let id = recep._id;
    let liked = JSON.parse(localStorage.getItem('Favorites')) || [];
    if(liked.filter(f=>f._id===id).length > 0){
      liked = liked.filter(f=>f._id!=id);
      if(change==undefined)
      el.innerHTML = inactiveHeart;

    }else{
      liked.push(recep)
      if(change==undefined)
      el.innerHTML = activeHeart;

    }
    localStorage.setItem("Favorites", JSON.stringify(liked));

  });
}
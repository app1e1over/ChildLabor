import axios from 'axios';
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
    res= makeSvg(
      '/sprite.svg#icon-star-active',
      'recepie-card-star'
    );
  }else{
    res= makeSvg(
      './image/sprite.svg#icon-unactive-star',
      'recepie-card-star'
    );
  }
  res.setAttribute("width", "18")
  res.setAttribute("height", "18")
  return res;
}

function makeSvg(src, clas) {
  let svg = document.createElement('svg');

  svg.className = clas;
  svg.innerHTML = `<use href="${src}"></use>`;
  return svg;
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
  like.innerText = 'like';
  like.dataset.recipe = JSON.stringify(recipe);


  let lowerContainer = document.createElement('div');
  lowerContainer.classList.add('recipe-card-lower-container');

  let rating = document.createElement('div');
  rating.classList.add('recipe-card-rating');
  rating.innerText = padEndRating(recipe.rating);
  for (let i = 1; i <= 5; i++) {
    if(Math.floor(recipe.rating-i)>0){
      rating.innerHTML+='<svg class="recipe-card-star" width="18" height="18"><path fill="#eea10c" d="M13.826 3.262c.686-2.105 3.664-2.105 4.347 0l1.931 5.943a2.292 2.292 0 0 0 2.174 1.582h6.251c2.215 0 3.134 2.834 1.344 4.135l-5.058 3.673a2.287 2.287 0 0 0-.825 2.572l-.005-.016 1.931 5.945c.686 2.105-1.726 3.858-3.518 2.555l-5.056-3.673c-.372-.273-.839-.437-1.344-.437s-.972.164-1.35.441l.006-.004-5.056 3.673c-1.792 1.303-4.201-.45-3.518-2.555l1.931-5.943a2.282 2.282 0 0 0-.823-2.553l-.006-.004-5.058-3.673c-1.79-1.303-.869-4.137 1.344-4.137h6.251a2.287 2.287 0 0 0 2.167-1.561l.005-.016 1.934-5.943z" style="fill:var(--color5, #eea10c)"/></svg>';
    }else{
      rating.innerHTML+='<svg class="recipe-card-star" width="18" height="18"><use href="./image/sprite.svg#icon-unactive-star"></use></svg>';

    }
  }
  lowerContainer.appendChild(rating);

  let seeRecep = document.createElement('div');
  seeRecep.classList.add('recipe-card-see-recipe');
  seeRecep.innerText = 'See recipe';
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

!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},a=e.parcelRequirec149;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in r){var a=r[e];delete r[e];var n={id:e,exports:{}};return t[e]=n,a.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},e.parcelRequirec149=a);var n=a("dIxxU");function i(e){var t=document.createElement("div");t.classList.add("recipe-card-container");var r=document.createElement("img");r.src=e.thumb,r.classList.add("recipe-card-bg");var a=document.createElement("div");a.classList.add("recipe-card-wrap");var n=document.createElement("div");n.classList.add("recipe-card-text");var i=document.createElement("p");i.classList.add("recipe-card-title"),i.innerText=e.title;var c=document.createElement("p");c.classList.add("recipe-card-description"),c.innerText=e.description;var d=document.createElement("button");d.classList.add("heart-button"),d.classList.add("recipe-card-like-btn"),d.innerText="like",d.dataset.recipe=JSON.stringify(e);var l=document.createElement("div");l.classList.add("recipe-card-lower-container");var s,o=document.createElement("div");o.classList.add("recipe-card-rating"),o.innerText=1===(s=(s=e.rating).toString()).length?s+".0":s.length>3?s.slice(0,3):s;for(var p=1;p<=5;p++)Math.floor(e.rating-p)>0?o.innerHTML+='<svg class="recipe-card-star" width="18" height="18"><path fill="#eea10c" d="M13.826 3.262c.686-2.105 3.664-2.105 4.347 0l1.931 5.943a2.292 2.292 0 0 0 2.174 1.582h6.251c2.215 0 3.134 2.834 1.344 4.135l-5.058 3.673a2.287 2.287 0 0 0-.825 2.572l-.005-.016 1.931 5.945c.686 2.105-1.726 3.858-3.518 2.555l-5.056-3.673c-.372-.273-.839-.437-1.344-.437s-.972.164-1.35.441l.006-.004-5.056 3.673c-1.792 1.303-4.201-.45-3.518-2.555l1.931-5.943a2.282 2.282 0 0 0-.823-2.553l-.006-.004-5.058-3.673c-1.79-1.303-.869-4.137 1.344-4.137h6.251a2.287 2.287 0 0 0 2.167-1.561l.005-.016 1.934-5.943z" style="fill:var(--color5, #eea10c)"/></svg>':o.innerHTML+='<svg class="recipe-card-star" width="18" height="18"><use href="./image/sprite.svg#icon-unactive-star"></use></svg>';l.appendChild(o);var u=document.createElement("div");return u.classList.add("recipe-card-see-recipe"),u.innerText="See recipe",l.appendChild(u),t.appendChild(r),n.appendChild(i),n.appendChild(c),t.appendChild(d),a.appendChild(n),a.appendChild(l),t.appendChild(a),t}!function(){var e=function(){var e=document.getElementById("selectIng"),t=document.getElementById("selectCountry"),r=document.getElementById("selectTime"),a=(document.querySelector(".search"),document.getElementById("categories")),n=document.getElementById("pagination"),i={category:a,page:n,time:r,area:t,ingredients:e},c=!0,d="https://tasty-treats-backend.p.goit.global/api/recipes";for(var l in i)null!=i[l]&&null!=i[l].value&&(c?(d+="?",c=!1):d+="&",d+=l+"="+i[l].value);return d}();console.log(e);var t=document.querySelector(".recipe-container");n.default.get(e).then((function(e){return e.data.results})).then((function(e){var r=!0,a=!1,n=void 0;try{for(var c,d=e[Symbol.iterator]();!(r=(c=d.next()).done);r=!0){var l=c.value;t.append(i(l))}}catch(e){a=!0,n=e}finally{try{r||null==d.return||d.return()}finally{if(a)throw n}}}))}()}();
//# sourceMappingURL=index.03356793.js.map

var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=e.parcelRequirec149;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},e.parcelRequirec149=r);var n=r("ioLrG"),a=r("8IduK");document.querySelector(".recipe-container");const l=document.querySelector(".filters-list"),i=(document.querySelector(".favorites-list"),JSON.parse(localStorage.getItem("Favorites"))||[]);function c(){const e=document.querySelectorAll(".recipe-card-container");let t=JSON.parse(localStorage.getItem("id"));t&&e.forEach((e=>{t.forEach((t=>{e.dataset.recipe==t&&e.querySelector(".heart-button").classList.add("add")}))}))}function s(){console.log(i),i&&i.length?(l.innerHTML='<li><button class="filters-btn" type="button" data-id="All">All categories</button></li>',d(i),l.insertAdjacentHTML("beforeend",d(i))):l.innerHTML="";const e=localStorage.getItem("btn-active");if(e){document.querySelectorAll(".filters-btn").forEach((t=>{t.dataset.id==e&&(S(t),f(t),c())}))}}function d(e){return e.map((({category:e})=>e)).filter(((e,t,o)=>o.indexOf(e)===t)).sort().map((e=>`<li><button class="filters-btn" type="button" data-id="${e}">${e}</button></li>`)).join("")}console.log(localStorage.getItem("btn-active")),s();let u=!1;function f(e){document.querySelectorAll(".filters-btn").forEach((e=>e.classList.remove("active"))),e.classList.add("active"),localStorage.setItem("btn-active",e.dataset.id)}l.addEventListener("mousemove",(function(e){if(!u)return;l.scrollLeft-=e.movementX})),l.addEventListener("mousedown",(function(){u=!0})),document.addEventListener("mouseup",(function(){u=!1})),l.addEventListener("click",(function(e){if(console.log(e.target),"BUTTON"!=e.target.nodeName)return;f(e.target),S(e.target),c()})),console.log(localStorage.getItem("btn-active"));const g=document.querySelector(".favorites-list"),m=document.querySelector(".favorites-plug"),p=(document.querySelector(".test-cards"),document.querySelector(".fav-picture-thumb"));function v({page:e}){g.innerHTML="",m.classList.add("is-hidden"),p.classList.remove("is-hidden");let t=JSON.parse(localStorage.getItem("Favorites"));if(!t.length)return m.classList.remove("is-hidden"),void(window.matchMedia("(max-width: 767px)").matches&&p.classList.add("is-hidden"));let o=12*e-12,r=12*e;s(),h(t,o,r)}function S(e){let t=JSON.parse(localStorage.getItem("Favorites"));g.innerHTML="";const o=e;if("All"===o)h(t,start,end);else{let e=1;h(t.filter((e=>e.category.trim().toLowerCase()===o.dataset.id.trim().toLowerCase()||"All"==o.dataset.id)),12*e-12,12*e)}}function h(e,t,o){for(let r=t;r<=o&&r<e.length;r+=1)g.append((0,n.DrawCard)(e[r]))}var b=r("13v5H");(0,r("7O1Fl").StartScrollUp)();try{(0,b.startHeader)()}catch(e){console.log(e)}try{!function(){let e=JSON.parse(localStorage.getItem("Favorites")),t=Math.ceil(e.length/12);v({page:1}),e.length>12&&(0,a.createPagination)(t,1,v)}()}catch(e){console.log(e)}c();
//# sourceMappingURL=favorites.94e86c87.js.map
var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},l=e.parcelRequirec149;null==l&&((l=function(e){if(e in t)return t[e].exports;if(e in n){var l=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,l.call(r.exports,r,r.exports),r.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,t){n[e]=t},e.parcelRequirec149=l);var r=l("2shzp");function d(e){console.log(e);let t=document.createElement("div");t.classList.add("recepy-card-container");let n=document.createElement("img");n.src=e.thumb,n.classList.add("recepy-card-bg");let l=document.createElement("div");l.classList.add("recepy-card-text");let r=document.createElement("p");r.classList.add("recepy-card-title"),r.innerText=e.title;let d=document.createElement("p");return d.classList.add("recepy-card-description"),d.innerText=e.description,t.appendChild(n),l.appendChild(r),l.appendChild(d),t.appendChild(l),t}!function(){let e=function(){const e=document.getElementById("selectIng"),t=document.getElementById("selectCountry"),n=document.getElementById("selectTime"),l=(document.querySelector(".search"),document.getElementById("categories")),r=document.getElementById("pagination");let d={category:l,page:r,time:n,area:t,ingredients:e},c=!0,o="https://tasty-treats-backend.p.goit.global/api/recipes";for(let e in d)null!=d[e]&&null!=d[e].value&&(c?(o+="?",c=!1):o+="&",o+=e+"="+d[e].value);return o}();console.log(e);let t=document.querySelector(".recepy-container");r.default.get(e).then((e=>e.data.results)).then((e=>{for(let n of e)t.append(d(n))}))}();
//# sourceMappingURL=index.9beac228.js.map

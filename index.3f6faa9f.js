var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},i={},t=e.parcelRequirec149;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in i){var t=i[e];delete i[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,r){i[e]=r},e.parcelRequirec149=t);var n=t("2shzp");const o=document.querySelector(".popular-recipes-container");!async function(){try{const e=(await n.default.get("https://tasty-treats-backend.p.goit.global/api/recipes/popular")).data;let r="";e.forEach((e=>{const{preview:i,title:t,description:n}=e;r+=`\n        <div class="popular-recipes-list">\n          <img src="${i}" alt="${t}" class="popular-recipe-image">\n          <div class="popular-recipes-content">\n            <div class="popular-recipe-item-title">${t}</div>\n            <div class="popular-recipe-description">${n}</div>\n          </div>\n        </div>\n      `})),o.innerHTML=r}catch(e){console.error("Произошла ошибка:",e)}}();
//# sourceMappingURL=index.3f6faa9f.js.map

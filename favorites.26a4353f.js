var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},i=e.parcelRequirec149;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in r){var i=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,i.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},e.parcelRequirec149=i);var o=i("ioLrG");const a=document.querySelector(".favorites-list"),n=document.querySelector(".favorites-plug"),d=(document.querySelector(".test-cards"),document.querySelector(".fav-picture-thumb"));function s(){n.classList.add("is-hidden"),d.classList.remove("is-hidden");let e=JSON.parse(localStorage.getItem("Favorites"));if(!e.length)return n.classList.remove("is-hidden"),void(window.matchMedia("(max-width: 767px)").matches&&d.classList.add("is-hidden"));l(e)}function l(e){e.map((e=>{a.append((0,o.DrawCard)(e))}))}var c=i("13v5H"),u=i("7O1Fl"),f=i("8IduK");(0,u.StartScrollUp)(),(0,c.startHeader)(),s(),(0,f.createPagination)();
//# sourceMappingURL=favorites.26a4353f.js.map

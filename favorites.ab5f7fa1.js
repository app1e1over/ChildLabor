!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=e.parcelRequirec149;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var o=r[e];delete r[e];var a={id:e,exports:{}};return t[e]=a,o.call(a.exports,a,a.exports),a.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){r[e]=t},e.parcelRequirec149=o);var a=o("3gRQg"),n=o("7foJP"),i="Favorites",l=document.querySelector(".favorites-list"),d=document.querySelector(".favorites-plug"),s=(document.querySelector(".test-cards"),document.querySelector(".fav-picture-thumb"));function c(e){var t=e.page;l.innerHTML="",d.classList.add("is-hidden"),s.classList.remove("is-hidden");var r=JSON.parse(localStorage.getItem(i));if(console.log(r),console.log(r.length),!r.length)return d.classList.remove("is-hidden"),void(window.matchMedia("(max-width: 767px)").matches&&s.classList.add("is-hidden"));u(r,1*t-1+1,1*t)}function u(e,t,r){for(var o=t;o<=r;o+=1)l.append((0,a.DrawCard)(e[o]))}var f=o("hpusp");(0,o("f2GmJ").StartScrollUp)(),(0,f.startHeader)(),function(){var e=JSON.parse(localStorage.getItem(i)),t=Math.ceil(e.length/1);c({page:1}),(0,n.createPagination)(t,1,c)}()}();
//# sourceMappingURL=favorites.ab5f7fa1.js.map
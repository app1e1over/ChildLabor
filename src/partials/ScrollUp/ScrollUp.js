const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const header = document.querySelector("header");

// Визначення видимості хедера
function isHeaderVisible() {
  let headerRect = header.getBoundingClientRect();
  let headerBottom = headerRect.bottom || headerRect.y + headerRect.height;
  return headerBottom > 0;
}


export function StartScrollUp() {
    //код, який відбувається при запуску сайту, як наприклад виклик ф-цій і додання івент лістенерів

// Показати або приховати кнопку при прокрутці
window.addEventListener("scroll", function() {
  if (isHeaderVisible()) {
    scrollToTopBtn.classList.remove("show");
  } else {
    scrollToTopBtn.classList.add("show");
  }
});

// Прокрутка до верху при натисканні кнопки
scrollToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});     

}
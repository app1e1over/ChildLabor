import axios from "axios";
export const ModalStart = () => {
  const refs = {
    openModalBtns: document.querySelectorAll('[data-modal-open]'),
    modal: document.querySelector('[data-modal-recipe]'),
    closeModalBtn: document.querySelector('[data-action="close-modal]'),
    backdrop: document.querySelector('.recipe-backdrop'),
    nameElement: document.querySelector('.selected-recipe-name'),
    instructionElement: document.querySelector('.recipe-instruction'),
    videoElement: document.querySelector('.recipe-video-wrap'),
   ul: document.querySelector(".ingredients"),
   timeSpan: document.querySelector(".cooking-time")
  };
  function getVideoIdFromLink(link) {
    const regex =
      /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([\w-]+)/i;
    const matches = link.match(regex);
    return matches && matches[1] ? matches[1] : '';
  }
  
  function onOpenModal(e) {
      const id = e.target.parentElement.parentElement.parentElement.dataset.recipe;
      
      axios
        .get("https://tasty-treats-backend.p.goit.global/api/recipes/" + id)
        .then(response => response.data)
        .then(data => {
          console.log(data);
          refs.nameElement.textContent = data.title; // Оновлюємо назву
          refs.instructionElement.innerHTML = data.instructions;
         let ingredients = data.ingredients;


let time = data.time;
refs.timeSpan.textContent =`Time: ${time}`; // тут мы подтянули время


         renderIng(ingredients); // тут мы создаем список ингредиентов



          if (data.youtube) {
            const videoId = getVideoIdFromLink(data.youtube);
            refs.videoElement.innerHTML = `
              <iframe
                width="295"
                height="250"
                src="https://www.youtube.com/embed/${videoId}"
                frameborder="0"
                allowfullscreen
              ></iframe>`;
          } else {
            // Якщо немає відео, відображаємо зображення
            refs.videoElement.innerHTML = `
              <img
                class="recipe-image"
                src="${data.image}"
                alt="Recipe video"
                width="295"
                height="250"
              />`;
          }
        });
  
    refs.modal.classList.toggle('is-hidden');
    refs.closeModalBtn.addEventListener('click', onCloseModal);
    window.addEventListener('keydown', onEscKeyPress);
  }
  function onCloseModal() {
    refs.modal.classList.toggle('is-hidden');
    window.removeEventListener('keydown', onEscKeyPress);
  }
  function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  }
  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  }
  refs.openModalBtns.forEach(btn => {
    btn.addEventListener('click', onOpenModal);
  });
  refs.backdrop.addEventListener('click', onBackdropClick);

function renderIng(ingredients) { // а тут лежит функция, которая создает список ингредиентов
  ingredients.forEach(ingredient => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    li.textContent = ingredient.name;
    span.textContent = ingredient.measure;
    li.appendChild(span);
    refs.ul.appendChild(li);
  });
}

};




import axios from "axios";

export const ModalStart = () => {
  const refs = {
    openModalBtns: document.querySelectorAll('[data-action="open-modal"]'),
    modal: document.querySelector('[data-modal-recipe]'),
    closeModalBtn: document.querySelector('[data-action="close-modal"]'),
    backdrop: document.querySelector('.recipe-backdrop'),
    nameElement: document.querySelector('.selected-recipe-name'), // Додано посилання на елемент з назвою
    instructionElement: document.querySelector('.recipe-instruction'),
  };

  function onOpenModal(e) {
    const id = e.target.parentElement.parentElement.parentElement.dataset.recipe;
    axios
      .get("https://tasty-treats-backend.p.goit.global/api/recipes/" + id)
      .then(response => response.data)
      .then(data => {
        console.log(data);
        refs.nameElement.textContent = data.name; // Оновлюємо назву
        refs.instructionElement.innerHTML = data.instructions;
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
};

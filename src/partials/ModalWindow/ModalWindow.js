export const ModalStart=() => {
    const refs = {
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
      backdrop: document.querySelector(".backdrop"), // Додано посилання на елемент затемнення фону
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
    refs.backdrop.addEventListener("click", toggleModal); // Додано обробник події для закриття при кліку на затемнення
  
    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
      refs.backdrop.classList.toggle("is-hidden"); // Додано зміну стану затемнення фону
      document.body.classList.toggle("modal-open"); // Додано заборону/дозвіл прокрутки тіла
    }
  };
  
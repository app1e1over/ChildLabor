export const ModalStart = () => {
  const openModalBtns = document.querySelectorAll("[data-modal-open]");
  const closeModalBtn = document.querySelector("[data-modal-close]");
  const modal = document.querySelector("[data-modal]");
  const backdrop = document.querySelector(".backdrop");
  openModalBtns.forEach(btn => {
      console.log(btn); // Вивести в консоль поточну кнопку
      btn.addEventListener("click", toggleModal);
  });
  closeModalBtn.addEventListener("click", toggleModal);
  backdrop.addEventListener("click", toggleModal);
  function toggleModal(e) {
      modal.classList.toggle("is-hidden");
      backdrop.classList.toggle("is-hidden");
      document.body.classList.toggle("modal-open");
  }
};
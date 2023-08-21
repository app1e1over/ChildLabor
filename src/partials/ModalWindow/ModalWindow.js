export const ModalStart = () => {
  const openModalBtns = document.querySelectorAll("[data-modal-open]"); // Знайдіть всі кнопки, які відкривають модальне вікно
  const closeModalBtn = document.querySelector("[data-modal-close]");
  const modal = document.querySelector("[data-modal]");
  const backdrop = document.querySelector(".backdrop");
  // Додайте обробники подій для кожної кнопки, яка відкриває модальне вікно
  openModalBtns.forEach(btn => {
      btn.addEventListener("click", toggleModal);
  });
  closeModalBtn.addEventListener("click", toggleModal);
  backdrop.addEventListener("click", toggleModal);
  function toggleModal() {
      modal.classList.toggle("is-hidden");
      backdrop.classList.toggle("is-hidden");
      document.body.classList.toggle("modal-open");
  }
};
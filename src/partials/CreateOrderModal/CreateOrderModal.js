export const PopupStart = () => {
  const refs = {
    openPopupBtns: document.querySelectorAll('[data-popup-open]'),
    closePopupBtn: document.querySelector('[data-popup-close]'),
    popup: document.querySelector('.popup-body'),
    'popup-backdrop': document.querySelector('.popup-backdrop'),
    form: document.querySelector('.popup-form'),
  };

  refs.openPopupBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  refs.closePopupBtn.addEventListener('click', closeModal);
  refs['popup-backdrop'].addEventListener('click', function (event) {
    if (event.target === refs['popup-backdrop']) {
      closeModal();
    }
  });

  refs.form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(refs.form);
    const orderData = {};
    formData.forEach((value, key) => {
      orderData[key] = value;
    });

    sendOrderToBackend(orderData);
  });

  function openModal() {
    refs.popup.classList.remove('is-hidden');
    refs['popup-backdrop'].classList.remove('is-hidden');
    document.body.classList.add('js-popup-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    refs.popup.classList.add('is-hidden');
    refs['popup-backdrop'].classList.add('is-hidden');
    document.body.classList.remove('js-popup-open');
    document.body.style.overflow = '';
  }

  function sendOrderToBackend(orderData) {
    fetch('https://tasty-treats-backend.p.goit.global/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Відповідь від бекенду:', responseData);
      })
      .catch(error => {
        console.error('Помилка:', error);
      });
  }
};

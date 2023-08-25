import axios from 'axios';

function addDashes(input) {
  const value = input.value.replace(/\D/g, '');
  const formattedValue = value.replace(
    /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
    '$1-$2-$3-$4-$5'
  );
  input.value = formattedValue;
}

export const PopupStart = () => {
  const refs = {
    openPopupBtns: document.querySelectorAll('[data-popup-open]'),
    closePopupBtn: document.querySelector('[data-popup-close]'),
    popup: document.querySelector('.popup-body'),
    'popup-backdrop': document.querySelector('.popup-backdrop'),
    form: document.querySelector('.popup-form'),
    phoneNumberInput: document.querySelector('.popup-input[name="phone"]'),
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


  const submitButton = refs.form.querySelector('.popup-btn');
  submitButton.addEventListener('click', function () {
    const phoneNumberInput = refs.phoneNumberInput;
    addDashes(phoneNumberInput);
  });

  refs.phoneNumberInput.addEventListener('input', function () {
    addDashes(this);
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
  // бекенд
  function sendOrderToBackend(orderData) {
    try {
      axios
        .post(
          'https://tasty-treats-backend.p.goit.global/api/orders',
          orderData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(response => {
          console.log('Відповідь від бекенду:', response.data);
        })
        .catch(error => {
          console.error('Помилка при відправці запиту:', error);
        });
    } catch (error) {
      console.error('Помилка:', error);
    }
  }
}
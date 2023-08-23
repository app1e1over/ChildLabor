export const PopupStart = () => {
  const refs = {
    openPopupBtns: document.querySelectorAll('[data-popup-open]'),
    closePopupBtn: document.querySelector('[data-popup-close]'),
    popup: document.querySelector('.popup-body'),
    'popup-backdrop': document.querySelector('.popup-backdrop'),
    form: document.querySelector('.popup-form'), // Вибираємо форму з класом '.popup-form'
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
        // Обробка відповіді від бекенду
        console.log('Відповідь від бекенду:', responseData);
      })
      .catch(error => {
        // Обробка помилок
        console.error('Помилка:', error);
      });
  }
};

// export const PopupStart = () => {
//   const refs = {
//     openPopupBtns: document.querySelectorAll('[data-popup-open]'),
//     closePopupBtn: document.querySelector('[data-popup-close]'),
//     popup: document.querySelector('.popup-body'),
//     'popup-backdrop': document.querySelector('.popup-backdrop'),
//   };

//   refs.openPopupBtns.forEach(btn => {
//     btn.addEventListener('click', openModal);
//   });

//   refs.closePopupBtn.addEventListener('click', closeModal);
//   refs['popup-backdrop'].addEventListener('click', function (event) {
//     if (event.target === refs['popup-backdrop']) {
//       closeModal();
//     }
//   });

//   function openModal() {
//     refs.popup.classList.remove('is-hidden');
//     refs['popup-backdrop'].classList.remove('is-hidden');
//     document.body.classList.add('js-popup-open');
//     document.body.style.overflow = 'hidden';
//   }

//   function closeModal() {
//     refs.popup.classList.add('is-hidden');
//     refs['popup-backdrop'].classList.add('is-hidden');
//     document.body.classList.remove('js-popup-open');
//     document.body.style.overflow = '';
//   }
// };

// відправляє на бекенд
// document.addEventListener('DOMContentLoaded', () => {
//   PopupStart();
// });

// refs.form.addEventListener('submit', async event => {
//   event.preventDefault();

//   const formData = new FormData(refs.form);

//   try {
//     const response = await fetch(
//       'https://tasty-treats-backend.p.goit.global/api/orders',
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );

//     if (response.ok) {
//       alert('Data sent successfully!');
//       closeModal();
//     } else {
//       alert('Data submission failed.');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// });

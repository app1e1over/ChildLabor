
// const EVENTS_URL = 'https://tasty-treats-backend.p.goit.global/api/events';

// const swiperContainer = document.querySelector('.swiper-container');
// const swiperWrapper = document.querySelector('.swiper-wrapper');

// // Функція для отримання даних з сервера
// async function fetchData() {
//   try {
//     const response = await axios.get(EVENTS_URL);
//     return response.data;
//   } catch (error) {
//     console.error('Помилка запиту до сервера:', error);
//     return [];
//   }
// }

// // Функція для створення розмітки карточки кухаря
// function createCookCard(cook) {
//   return `
//     <div class="swiper-slide">
//       <div class="swiper-img">
//         <img src="${cook.imgUrl}" srcset="${cook.imgWebpUrl}" alt="${cook.name}" class="swiper-slide-img cook-card" />
//       </div>
//     </div>
//   `;
// }

// // Функція для створення розмітки центральної карточки
// function createCenterCard(topic) {
//   return `
//     <div class="swiper-slide">
//       <div class="event-card-preview">
//         <img src="${topic.previewUrl}" alt="masterclass" class="swiper-slide-img food-center-card" />
//         <p class="master-class">${topic.name}</p>
//         <p class="master-class-coutry">${topic.area}</p>
//       </div>
//     </div>
//   `;
// }

// // Функція для створення розмітки останньої карточки
// function createLastCard(topic) {
//   return `
//     <div class="swiper-slide">
//       <div class="swiper-img">
//         <img src="${topic.imgUrl}" alt="tasty food" class="swiper-slide-img big-slide-salat-img" />
//       </div>
//     </div>
//   `;
// }

// // Основна функція для відображення слайдів
// async function displaySlides() {
//   const data = await fetchData();
//   if (!data.length) return;

//   data.forEach(({ cook, topic }, index) => {
//     const cookCard = createCookCard(cook);
//     const centerCard = createCenterCard(topic);
//     const lastCard = createLastCard(topic);

//     swiperWrapper.insertAdjacentHTML('beforeend', cookCard + centerCard + lastCard);
//   });

//   new Swiper(swiperContainer, {
//     spaceBetween: 20,
//     pagination: {
//       el: '.swiper-pagination',
//       type: 'bullets',
//       clickable: true,
//       dynamicBullets: true,
//     },
//     autoplay: {
//       delay: 5000,
//       disableOnInteraction: false,
//     },
//     grabCursor: true,
//     loop: true,
//     mousewheel: {
//       invert: true,
//     },
//     slidesPerView: 1,
//     slidesPerGroup: 1,
//   });
// }

// window.addEventListener('load', displaySlides);







    import axios from "axios";
    import Swiper from 'swiper';
    import 'swiper/swiper-bundle.min.css';

    export function getMasterClasses() {
      let req = MakeRequestString();
      console.log(req);
      let cont = document.querySelector('.swiper-wrapper');
      axios
        .get(req)
        .then(response => {
          console.log(response.data); 
          return response.data;
      })
        .then(events => {
          for (let event of events) {
            const slide = DrawEventCard(event);
            cont.appendChild(slide);
          } 
        })
        .catch(error => {
          console.error("Помилка запиту до сервера:", error);
        })
        .finally( () =>  {
          new Swiper('.sample-slider', {
            spaceBetween: 20, // Відступ між слайдами
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true,
              dynamicBullets: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            grabCursor: true,
            // //   безкінечне гортання
            loop: true,
            // //   гортання мишкою
            mousewheel: {
              invert: true,
            },
            slidesPerView: 1,
            // к-сть слайдів які пролистуються
            slidesPerGroup: 1,
            // Додайте інші параметри Swiper за потреби
          });
          
        })
      }

      
    function DrawEventCard(event) {
      const card = document.querySelector('.swiper-slide');
     
      const chefImageDiv = document.createElement('div')
      chefImageDiv.classList.add( 'cook-card');
      const chefImage = createImage(event.cook.imgUrl);
      chefImage.classList.add('event-card-cook');
      chefImageDiv.appendChild(chefImage);

     card.appendChild(chefImageDiv);
      
    const previewImageDiv = document.createElement('div');
    previewImageDiv.classList.add('event-card-preview');


    const previewImage = createImage(event.topic.previewUrl);
    previewImage.classList.add('slider-middle-img');
    previewImageDiv.appendChild(previewImage);

    // Додайте text та aria безпосередньо до previewImageDiv
    const eventName = createParagraph( event.topic.name);
    eventName.classList.add('event-card-text');
    previewImageDiv.appendChild(eventName);



    const dishRegion = createParagraph(event.topic.area);
    dishRegion.classList.add('event-card-area');
    previewImageDiv.appendChild(dishRegion);

    card.appendChild(previewImageDiv);

    // Створюємо <div> для dishImage і додаємо в нього зображення
    const dishImageDiv = document.createElement('div');
    dishImageDiv.classList.add('event-card-bigimg');
    const dishImage = createImage(event.topic.imgUrl);
    dishImage.classList.add('event-card-bigimg-url');
    dishImageDiv.appendChild(dishImage);
    card.appendChild(dishImageDiv);
    
      return card;
    }
    
    function MakeRequestString() {
      const baseUrl = "https://tasty-treats-backend.p.goit.global"; 
    
      const resource = "/api/events"; 
    
      const requestUrl = `${baseUrl}${resource}`;
    
      return requestUrl;
    }
    
    function createImage(src) {
      const image = document.createElement('img');
      image.src = src;
      return image;
    }
    
    function createHeading(headingType, text) {
      const heading = document.createElement(headingType);
      heading.textContent = text;
      return heading;
    }
    
    function createParagraph(text) {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }
  
    
    
    // const sliderWrapperElement = document.querySelector('.swiper-wrapper');
    // const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';
    // console.log(BASE_URL);
    
    // async function fetchMasterClasses() {
    //   try {
    //     const response = await axios.get(BASE_URL);
    //     return response.data;
    //   } catch (error) {
    //     console.error(error);
    //     return [];
    //   }
    // }
    
    // fetchMasterClasses();
    
    // const item = [];
    
    // function createSlideMarkup(item) {
    //   const { cook, topic } = item;
    //   return 
    //     `<div class="swiper-slide">
    //       <img src="${cook.imgUrl}" alt="${cook.name}" class="cook-img" style="width: 182px; height: 442px; margin-right: 16px; border-radius: 15px">
    //       </div>
    //        <div class="swiper-slide">
    //       <img src="${topic.previewUrl}" alt="${topic.name}" class="dish-img middle-img">
    //       <div class="content">
    //         <h2 class="slider-title">${topic.name}</h2>
    //         <p class="slider-text">${topic.area}</p>
    //       </div>
    //       </div>
    //        <div class="swiper-slide">
    //       <img src="${topic.imgUrl}" alt="${topic.name}" class="dish-img">
    //       </div>
    //     </div>`   ;
    // }
    
    // const addGalleryMarkup = createSlideMarkup(item);
    
    // sliderWrapperElement.innerHTML = addGalleryMarkup;
    
    
    
    
    // import axios from "axios";
    // import Swiper from 'swiper/swiper-bundle.min'; // Імпорт Swiper з npm
    
    
    // // Отримайте елементи DOM
    // const sliderContainer = document.querySelector('.swiper-container');
    // const sliderWrapper = sliderContainer.querySelector('.swiper-wrapper');
    
    // // Отримайте дані з бекенду, які містять фотографії
    // function fetchMasterClasses() {
    //   const req = MakeRequestString();
    //   axios
    //     .get(req)
    //     .then(response => {
    //       const events = response.data;
    //       for (const event of events) {
    //         // Створюємо елементи для фотографій кухарів і додаємо їх до слайдера
    //         const card = DrawEventCard(event);
    //         sliderWrapper.appendChild(card);
    //       }
    
    //       // Після додавання всіх слайдів налаштуйте Swiper
    //       new Swiper(sliderContainer, {
    //         slidesPerView: 'auto', // Встановлюємо кількість слайдів, які видно одночасно
    //         spaceBetween: 16, // Відступ між слайдами
    //         pagination: {
    //           el: '.swiper-pagination', // Додаємо пагінацію (dots)
    //           clickable: true, // Зробити dots клікабельними
    //         },
    //         // Додайте інші параметри Swiper за потреби
    //       });
    //     })
    //     .catch(error => {
    //       console.error("Помилка запиту до сервера:", error);
    //     });
    // }
    
    // // Викликати функцію для отримання даних та ініціалізації слайдера
    // fetchMasterClasses();
    
    // function MakeRequestString() {
    //   const baseUrl = "https://tasty-treats-backend.p.goit.global"; 
    //   const resource = "/api/events"; 
    //   const requestUrl = `${baseUrl}${resource}`;
    //   return requestUrl;
    // }
    
    // function createImage(src) {
    //   const image = document.createElement('img');
    //   image.src = src;
    //   return image;
    // }
    
    // function createHeading(headingType, text) {
    //   const heading = document.createElement(headingType);
    //   heading.textContent = text;
    //   return heading;
    // }
    
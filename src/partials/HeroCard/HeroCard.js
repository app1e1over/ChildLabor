


// export async function getMasterclass() {
    //   try {
    //     const response = await axios.get('https://tasty-treats-backend.p.goit.global/api/events');
    //     const events = response.data;
        
    //     const slider = document.querySelector('.slider-container'); 
    
    //     events.forEach(event => {
    //       const card = document.createElement('div');
    //       card.classList.add('event-card');
          
    //       const chefImage = new Image();
    //       chefImage.src = event.cook.imgUrl;
    //       card.appendChild(chefImage);
          
    //       const eventName = document.createElement('h2');
    //       eventName.textContent = event.topic.name;
    //       card.appendChild(eventName);
          
    //       const dishRegion = document.createElement('p');
    //       dishRegion.textContent = event.topic.area;
    //       card.appendChild(dishRegion);
          
    //       const previewImage = new Image();
    //       previewImage.src = event.topic.previewUrl;
    //       card.appendChild(previewImage);
          
    //       const dishImage = new Image();
    //       dishImage.src = event.topic.imgUrl;
    //       card.appendChild(dishImage);
          
    //       slider.appendChild(card);
    //     });
        
    //     return response;
    //   } catch (error) {
    //     console.error('An error occurred:', error);
    //   }
    // }
    // getMasterclass();
    
    // export function getMasterclass() {
    //   const slider = document.querySelector('.slider-container'); 
    //   axios.get('https://tasty-treats-backend.p.goit.global/api/events')
    //     .then(response => {
    //       const events = response.data;
    
    //       events.forEach(event => {
    //         const card = DrawEventCard(event);
    //         slider.appendChild(card);
    //       });
    //     })
    //     .catch(error => {
    //       console.error('An error occurred:', error);
    //     });
    // }
    
    
    
    
    // export async function getMasterclass() {
    //   try {
    //     const response = await axios.get('https://tasty-treats-backend.p.goit.global/api/events');
    //     const events = response.data;
        
    //     const slider = document.querySelector('.slider-container'); 
    
    //     events.forEach(event => {
    //       const card = document.createElement('div');
    //       card.classList.add('event-card');
          
    //       const chefImage = new Image();
    //       chefImage.src = event.cook.imgUrl;
    //       card.appendChild(chefImage);
          
    //       const eventName = document.createElement('h2');
    //       eventName.textContent = event.topic.name;
    //       card.appendChild(eventName);
          
    //       const dishRegion = document.createElement('p');
    //       dishRegion.textContent = event.topic.area;
    //       card.appendChild(dishRegion);
          
    //       const previewImage = new Image();
    //       previewImage.src = event.topic.previewUrl;
    //       card.appendChild(previewImage);
          
    //       const dishImage = new Image();
    //       dishImage.src = event.topic.imgUrl;
    //       card.appendChild(dishImage);
          
    //       slider.appendChild(card);
    //     });
        
    //     return response;
    //   } catch (error) {
    //     console.error('An error occurred:', error);
    //   }
    // }
    // getMasterclass();
    
    // export function getMasterclass() {
    //   const slider = document.querySelector('.slider-container'); 
    //   axios.get('https://tasty-treats-backend.p.goit.global/api/events')
    //     .then(response => {
    //       const events = response.data;
    
    //       events.forEach(event => {
    //         const card = DrawEventCard(event);
    //         slider.appendChild(card);
    //       });
    //     })
    //     .catch(error => {
    //       console.error('An error occurred:', error);
    //     });
    // }
    
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
            cont.append(DrawEventCard(event));
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
      const card = document.querySelector('.swiper-slide')
      // card.classList.add('event-card');
    
      const chefImage = createImage(event.cook.imgUrl);
      chefImage.classList.add('event-card-cook', 'cook-card');
      card.appendChild(chefImage);
     
      // const eventName = createHeading('h2', event.topic.name);
      // eventName.classList.add('event-card-text');
      // card.appendChild(eventName);
    
      // const dishRegion = createParagraph(event.topic.area);
      // dishRegion.classList.add('event-card-area');
      // card.appendChild(dishRegion);
      // const eventInfoDiv = document.createElement('div');
      // eventInfoDiv.classList.add('event-card-textdiv');
      // const eventName = createHeading('h2', event.topic.name);
      // eventName.classList.add('event-card-text');
      // eventInfoDiv.appendChild(eventName);

      // const dishRegion = createParagraph(event.topic.area);
      // dishRegion.classList.add('event-card-area');
      // eventInfoDiv.appendChild(dishRegion);

      // card.appendChild(eventInfoDiv);
    
      // const previewImage = createImage(event.topic.previewUrl);
      // previewImage.classList.add('event-card-preview');
      // card.appendChild(previewImage);
    
      // const dishImage = createImage(event.topic.imgUrl);
      // dishImage.classList.add('event-card-bigimg');
      // card.appendChild(dishImage);
    //   const previewImageDiv = document.createElement('div');
    // previewImageDiv.classList.add('event-card-preview');
    // const previewImage = createImage(event.topic.previewUrl);
    // previewImageDiv.appendChild(previewImage);
    // card.appendChild(previewImageDiv);

    const previewImageDiv = document.createElement('div');
    previewImageDiv.classList.add('event-card-preview');

    const previewImage = createImage(event.topic.previewUrl);
    previewImageDiv.appendChild(previewImage);

    // Додайте text та aria безпосередньо до previewImageDiv
    const eventName = createHeading('h2', event.topic.name);
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
    
    // function createParagraph(text) {
    //   const paragraph = document.createElement('p');
    //   paragraph.textContent = text;
    //   return paragraph;
    // }
    //   function DrawEventCard(event) {
    //     const card = document.createElement('div');
    //     card.classList.add('swiper-slide'); // Додали клас для слайду
    //       const chefImage = createImage(event.cook.imgUrl);
    //       card.appendChild(chefImage);
         
    //       const eventName = createHeading('h2', event.topic.name);
    //       card.appendChild(eventName);
        
    //       const dishRegion = createParagraph(event.topic.area);
    //       card.appendChild(dishRegion);
        
    //       const previewImage = createImage(event.topic.previewUrl);
    //       card.appendChild(previewImage);
        
    //       const dishImage = createImage(event.topic.imgUrl);
    //       card.appendChild(dishImage);
        
    //       return card;
    //     }
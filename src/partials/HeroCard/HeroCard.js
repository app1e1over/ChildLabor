


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

export function eventUpdate() {
  let req = MakeRequestString();
  console.log(req);
  let cont = document.querySelector('.slider-container');
  axios
    .get(req)
    .then(response => {
      console.log(response.data); 
      return response.data.results;
  })
    .then(events => {
      for (let event of events) {
        cont.append(DrawEventCard(event));
      }
    })
    .catch(error => {
      console.error("Помилка запиту до сервера:", error);
    });
  }
function DrawEventCard(event) {
  const card = document.createElement('div');
  card.classList.add('event-card');

  const chefImage = createImage(event.cook.imgUrl);
  card.appendChild(chefImage);
 
  const eventName = createHeading('h2', event.topic.name);
  card.appendChild(eventName);

  const dishRegion = createParagraph(event.topic.area);
  card.appendChild(dishRegion);

  const previewImage = createImage(event.topic.previewUrl);
  card.appendChild(previewImage);

  const dishImage = createImage(event.topic.imgUrl);
  card.appendChild(dishImage);

  return card;
}

eventUpdate();

// function MakeRequestString() {
//   const selectIngredients = document.getElementById('selectIng');
//   const selectCountry = document.getElementById('selectCountry');
//   const selectTime = document.getElementById('selectTime');
//   const search = document.querySelector('.search');
//   const category = document.getElementById('categories');
//   const paginator = document.getElementById('pagination');
//   let obj = {
//     category: category,
//     page: paginator,
//     time: selectTime,
//     area: selectCountry,
//     ingredients: selectIngredients,
//   };
//   let first = true;

//   let str = 'https://tasty-treats-backend.p.goit.global/api/recipes';
//   for (let key in obj) {
//     if (obj[key] != undefined && obj[key].value != undefined) {
//       if (!first) {
//         str += '&';
//       } else {
//         str += '?';
//         first = false;
//       }
//       str += key + '=' + obj[key].value;
//     }
//   }
//   return str;
// }

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



// const masterclassDescription = document.querySelector(".masterclass-preview");
// const title = "Learn to Cook Tasty Treats'Customizable Masterclass";
// const description = "TastyTreats - Customize Your Meal with Ingredient Options and Step-by-Step Video Guides.";


// const template = `  <h2 class="title">${title}</h2>
//                     <p class="description">${description}</p>`;

// masterclassDescription.innerHTML = template;

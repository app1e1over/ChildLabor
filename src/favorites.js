import { StartFavorites } from './js/Favorites.js';
import { startHeader } from './js/Header.js';
import { StartScrollUp } from './js/ScrollUp.js';
import { updateHearts } from './js/FavoritesFilter.js';
//import 'normalize.css';



StartScrollUp();

try {
  startHeader();
} catch (er) {
  console.log(er);
}

try {
  StartFavorites();
} catch (er) {
  console.log(er);
}

updateHearts();

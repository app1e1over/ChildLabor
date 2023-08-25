import { StartFavorites } from './partials/Favorites/Favorites.js';
import { startHeader } from './partials/Header/Header.js';
import { StartScrollUp } from './partials/ScrollUp/ScrollUp.js';
import { updateHearts } from './partials/FavoritesFilter/FavoritesFilter.js';
import { ModalStart } from './partials/ModalWindow/ModalWindow.js';
//import 'normalize.css';



StartScrollUp();
ModalStart();
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

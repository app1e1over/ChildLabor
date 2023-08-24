import { StartFavorites } from './partials/Favorites/Favorites.js';
import { startHeader } from './partials/Header/Header.js';
import { StartScrollUp } from './partials/ScrollUp/ScrollUp.js';
import { updateHearts } from './partials/FavoritesFilter/FavoritesFilter.js';

StartScrollUp();

try {
  startHeader();
} catch (у) {
  console.log(у);
}

try {
  StartFavorites();
} catch (у) {
  console.log(у);
}

updateHearts();

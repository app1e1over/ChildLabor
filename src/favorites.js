import {StartFavorites} from "./partials/Favorites/Favorites.js";
import { startHeader } from "./partials/Header/Header.js";
import { StartScrollUp } from "./partials/ScrollUp/ScrollUp.js";
import { updateHearts } from "./partials/FavoritesFilter/FavoritesFilter.js";

StartScrollUp();
startHeader();
try{
StartFavorites();}
catch{
    
}
updateHearts();
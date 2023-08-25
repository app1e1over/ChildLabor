import axios from "axios";
import { Update } from "./js/RecepieCards.js";
import { startHeader } from "./js/Header.js";
import { getMasterClasses } from "./js/HeroCard.js";
import { startCategories } from "./js/Categories.js";
import { StartScrollUp } from "./js/ScrollUp.js";
import { selects } from "./js/Selects.js";
import fetchPopularRecipes from "./js/PopularRecipe.js"
import { PopupStart } from "./js/CreateOrderModal.js";
//import 'normalize.css';

try {
UpdateFavorites();    
} catch (error) {
    console.log("Error in UpdateFavorites:"+error);
}
Update({});
try {
startHeader();    
} catch (error) {
    console.log("Error in Header:"+error);    
}
getMasterClasses();
startCategories();
StartScrollUp();
fetchPopularRecipes();
selects();
PopupStart();
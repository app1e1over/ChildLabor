import axios from "axios";
import { Update } from "./partials/RecepieCards/RecepieCards.js";
import { startHeader } from "./partials/Header/Header.js";
import { getMasterClasses } from "./partials/HeroCard/HeroCard.js";
import { startCategories } from "./partials/Categories/Categories.js";
import { StartScrollUp } from "./partials/ScrollUp/ScrollUp.js";

try {
UpdateFavorites();    
} catch (error) {
    console.log("Error in UpdateFavorites:"+error);
}
Update();
try {
startHeader();    
} catch (error) {
    console.log("Error in Header:"+error);    
}
getMasterClasses();
startCategories();
StartScrollUp();

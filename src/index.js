import axios from "axios";
import {UpdateFavorites} from "./partials/Favorites/Favorites.js";
import { Update } from "./partials/RecepieCards/RecepieCards.js";
import { startHeader } from "./partials/Header/Header.js";


Update();
startHeader();
UpdateFavorites();
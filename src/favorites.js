import {StartFavorites} from "./partials/Favorites/Favorites.js";
import { startHeader } from "./partials/Header/Header.js";
import { StartScrollUp } from "./partials/ScrollUp/ScrollUp.js";
import { createPagination } from "./partials/Pagination/Pagination.js";

StartScrollUp();
startHeader();
StartFavorites();
createPagination();
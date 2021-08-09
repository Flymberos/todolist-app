import {createSidebar, createMainContent, createModal} from "./page.js";
import {addListeners} from "./listeners.js";

createSidebar();
createMainContent();
createModal();
//Add after all DOM elements have been created
addListeners();


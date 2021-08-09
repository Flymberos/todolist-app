import {addProjectButton, modalContainer} from './page.js'


function addListeners(){
    addProjectButton.addEventListener("click", () => {
        modalContainer.style.display = "block";
    });
}

export {addListeners}
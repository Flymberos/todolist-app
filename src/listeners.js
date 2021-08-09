import {addProjectButton, modalContainer, closeFormButton} from './page.js'


function addListeners(){
    addProjectButton.addEventListener("click", () => {
        modalContainer.style.display = "block";
    });

    closeFormButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })
}

export {addListeners}
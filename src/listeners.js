import {addProjectButton} from './page.js'

function addProjectListener(){
    addProjectButton.addEventListener("click", () => {
        alert("Works");
    });
}

export {addProjectListener}
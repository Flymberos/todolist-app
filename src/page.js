import {addListeners} from './listeners.js';

let content = document.querySelector("#content");
let modalContainer;

//Buttons for export
let addProjectButton;
let closeFormButton;
let submitFormButton;

function createSidebar(){

    let sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    let title = document.createElement("h1");
    title.textContent = "Projects"
    title.classList.add("title");

    let projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects-container");

    addProjectButton = document.createElement("button");
    addProjectButton.textContent = "+ Add Project";
    projectsContainer.appendChild(addProjectButton);

    sidebar.appendChild(title);
    sidebar.appendChild(projectsContainer);
    content.appendChild(sidebar);
}

function createMainContent(){
    let mainPage = document.createElement("div");
    mainPage.classList.add("main-page");
    content.appendChild(mainPage);
}

function createModal(){
    modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    modalContainer.style.display = "none";

    let form = document.createElement("form");
    form.classList.add("modal-form");
    let titleInputForm = document.createElement("input");
    let descInputForm = document.createElement("input");

    let formButtonContainer = document.createElement("div");
    let submitFormButton = document.createElement("button");
    let closeFormButton = document.createElement("button");

    submitFormButton.classList.add("form-submit-button");
    closeFormButton.classList.add("form-cancel-button");

    titleInputForm.required = true;
    titleInputForm.placeholder = "Enter the title for the project"
    descInputForm.required = true;
    descInputForm.placeholder = "Description of the project"
    submitFormButton.textContent = "Add";
    closeFormButton.textContent = "Cancel";

    formButtonContainer.appendChild(submitFormButton);
    formButtonContainer.appendChild(closeFormButton);

    form.appendChild(titleInputForm);
    form.appendChild(descInputForm);
    form.appendChild(formButtonContainer);

    modalContainer.appendChild(form);    
    content.appendChild(modalContainer);

}

export {createSidebar, 
        createMainContent, 
        createModal, 
        addProjectButton,
        submitFormButton,
        closeFormButton,
        modalContainer
        }
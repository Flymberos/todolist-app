import {projects} from './logic.js';
import {openProjectListener, deleteProjectListener,
     editProjectListener, editFormCancelButtonListener,
      editFormSaveButtonListener} from './listeners.js'

let content = document.querySelector("#content");

//Global containers
let modalContainer;
let projectsContainer;
let mainPage;
let mainPageTitleWrapper;
let editFormDiv;

//Global buttons

//Buttons for export
let addProjectButton;
let closeFormButton;
let submitFormButton;

//Input for export
let titleInputForm;
let descInputForm;

function createSidebar(){

    let sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    let title = document.createElement("h1");
    title.textContent = "Projects"
    title.classList.add("title");

    projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects-container");

    addProjectButton = document.createElement("button");
    addProjectButton.textContent = "+ Add Project";
    projectsContainer.appendChild(addProjectButton);

    sidebar.appendChild(title);
    sidebar.appendChild(projectsContainer);
    content.appendChild(sidebar);
}

function createMainContent(){
    mainPage = document.createElement("div");
    mainPage.classList.add("main-page");
    content.appendChild(mainPage);
}

function createModal(){
    modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    modalContainer.style.display = "none";

    let form = document.createElement("form");
    form.classList.add("modal-form");
    titleInputForm = document.createElement("input");
    descInputForm = document.createElement("input");

    let formButtonContainer = document.createElement("div");
    submitFormButton = document.createElement("button");
    closeFormButton = document.createElement("button");

    submitFormButton.classList.add("form-submit-button");
    closeFormButton.classList.add("form-cancel-button");

    titleInputForm.required = true;
    titleInputForm.placeholder = "Enter the title for the project";
    descInputForm.required = true;
    descInputForm.placeholder = "Description of the project";
    submitFormButton.textContent = "Add";
    submitFormButton.type = "button";
    closeFormButton.textContent = "Cancel";

    formButtonContainer.appendChild(submitFormButton);
    formButtonContainer.appendChild(closeFormButton);

    form.appendChild(titleInputForm);
    form.appendChild(descInputForm);
    form.appendChild(formButtonContainer);

    modalContainer.appendChild(form);    
    content.appendChild(modalContainer);

}

function openModal(){
    modalContainer.style.display = "block";
}

function closeModal(){
    modalContainer.style.display = "none";
}

function clearModalInput(){
    titleInputForm.value = "";
    descInputForm.value = "";
}

function showProjects(){

    for(let i=projectsContainer.childNodes.length - 1; i<projects.length; i++){
        let projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        let projectTitle = document.createElement("p");
        projectTitle.textContent = projects[i].title;
        projectContainer.appendChild(projectTitle);
        projectsContainer.prepend(projectContainer);
        openProjectListener(projectContainer, i);
    }

}

function openProject(project, index){

    mainPage.innerHTML = "";

    mainPageTitleWrapper = document.createElement("div");
    mainPageTitleWrapper.classList.add("main-page-wrapper");
    let titleContainer = document.createElement("div");
    titleContainer.classList.add("main-page-title-container")
    let title = document.createElement("h1");
    title.textContent = project.title;

    let deleteIcon = document.createElement("img");
    let editIcon = document.createElement("img");
    deleteIcon.src = "../dist/img/bin.png";
    editIcon.src = "../dist/img/edit.png";

    deleteProjectListener(deleteIcon, index);
    editProjectListener(editIcon, index);

    titleContainer.appendChild(title);
    titleContainer.appendChild(editIcon);
    titleContainer.appendChild(deleteIcon);

    let subtitle = document.createElement("h2");
    subtitle.textContent = project.description;

    let seperator = document.createElement("hr");

    mainPageTitleWrapper.appendChild(titleContainer);
    mainPageTitleWrapper.appendChild(subtitle);
    mainPage.appendChild(mainPageTitleWrapper);
    mainPage.appendChild(seperator);
}

function deleteProject(index){
    projectsContainer.removeChild(projectsContainer.childNodes[index]);
    mainPage.innerHTML = "";
}

function editProject(index){
    let htmlContents = mainPageTitleWrapper.innerHTML;
    mainPageTitleWrapper.style.display = "none";

    editFormDiv = document.createElement("div");
    editFormDiv.classList.add("main-page-edit-form");
    let editTitle = document.createElement("input");
    let editDesc = document.createElement("input");
    let saveButton = document.createElement("button");
    let cancelButton = document.createElement("button");
    let buttonContainer = document.createElement("div");

    saveButton.textContent = "Save";
    cancelButton.textContent = "Cancel";
    editTitle.placeholder = "Enter new title";
    editDesc.placeholder = "Enter new subtitle";

    editFormCancelButtonListener(cancelButton, htmlContents);

    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    editFormDiv.appendChild(editTitle);
    editFormDiv.appendChild(editDesc);
    editFormDiv.appendChild(buttonContainer);
    
    mainPage.prepend(editFormDiv);
}

function cancelEdit(htmlContents){
    editFormDiv.innerHTML = "";
    mainPageTitleWrapper.style.display = "block";
}

export {createSidebar,
        createMainContent, 
        createModal, 
        addProjectButton,
        submitFormButton,
        closeFormButton,
        modalContainer,
        titleInputForm,
        descInputForm,
        openModal,
        closeModal,
        clearModalInput,
        showProjects,
        projectsContainer,
        openProject,
        deleteProject,
        editProject,
        cancelEdit
        }
import {projects, Todo} from './logic.js';
import {openProjectListener, deleteProjectListener,
     editProjectListener, editFormCancelButtonListener,
      editFormSaveButtonListener, addTodoListener,
        todoFormCancelListener, todoFormAddListener} from './listeners.js';
import { differenceInMinutes, formatDistance, subDays } from 'date-fns'
import { differenceInHours } from 'date-fns/esm';

let content = document.querySelector("#content");

//Global containers
let modalContainer;
let projectsContainer;
let mainPage;
let mainPageTitleWrapper;
let editFormDiv;
let todoContainer;
let todoFormContainer;

//Global buttons

//Buttons for export
let addProjectButton;
let closeFormButton;
let submitFormButton;
let addTodoButton;

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

    //Append all the elemnts
    mainPageTitleWrapper.appendChild(titleContainer);
    mainPageTitleWrapper.appendChild(subtitle);
    mainPage.appendChild(mainPageTitleWrapper);
    mainPage.appendChild(seperator);
    showTodos(project, index);
}

function showTodos(project, index){

    todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");

    addTodoButton = document.createElement("button");
    addTodoButton.classList.add("add-todo-button");
    addTodoButton.textContent = "+ Add Todo";

    todoContainer.appendChild(addTodoButton);
    mainPage.appendChild(todoContainer);

    for(let i=0; i<project.todos.length; i++){
        createTodo(project.todos[i].title, project.todos[i].dueDate);
    }

    addTodoListener(addTodoButton, project)
}

function addTodoForm(project){
    addTodoButton.style.display = "none";

    todoFormContainer = document.createElement("div");
    let todoName = document.createElement("input");
    let dueDate = document.createElement("input");
    let cancelButton = document.createElement("button");
    let addButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    addButton.textContent = "Add";
    dueDate.type = "date";

    todoFormCancelListener(cancelButton);
    todoFormAddListener(addButton, todoName, dueDate, project);

    todoFormContainer.appendChild(todoName);
    todoFormContainer.appendChild(dueDate);
    todoFormContainer.appendChild(addButton);
    todoFormContainer.appendChild(cancelButton);

    todoContainer.appendChild(todoFormContainer);
}

function showTodoAddButton(){
    addTodoButton.style.display = "block";
    todoFormContainer.style.display = "none";
}

function addTodo(name, date, project){
    project.addTodo(new Todo(name, date));
    todoFormContainer.style.display = "none";
    addTodoButton.style.display = "block";
    
    createTodo(name, date, project);
}

function createTodo(name, date){
    let singleTodoContainer = document.createElement("div");
    singleTodoContainer.classList.add("single-todo-container");
    let checkBox = document.createElement("input")
    checkBox.type = "checkbox";
    let todoName = document.createElement("p");
    let todoHoursLeft = document.createElement("p");

    let deleteIcon = document.createElement("img");
    let editIcon = document.createElement("img");
    deleteIcon.src = "../dist/img/bin.png";
    editIcon.src = "../dist/img/edit.png";

    let hoursLeft = differenceInHours(new Date(date), new Date());
    hoursLeft = (hoursLeft < 0) ? 0 : hoursLeft;

    todoName.textContent = name;
    todoHoursLeft.textContent = hoursLeft + " hours left";

    singleTodoContainer.appendChild(checkBox);
    singleTodoContainer.appendChild(todoName);
    singleTodoContainer.appendChild(todoHoursLeft);
    singleTodoContainer.appendChild(deleteIcon);
    singleTodoContainer.appendChild(editIcon);
    todoContainer.prepend(singleTodoContainer);
}

function deleteProject(index){
    projectsContainer.removeChild(projectsContainer.childNodes[index]);
    mainPage.innerHTML = "";
}

function editProject(index){
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

    editFormCancelButtonListener(cancelButton);
    editFormSaveButtonListener(saveButton, editTitle, editDesc, index);

    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    editFormDiv.appendChild(editTitle);
    editFormDiv.appendChild(editDesc);
    editFormDiv.appendChild(buttonContainer);
    
    mainPage.prepend(editFormDiv);
}

function cancelEdit(){
    editFormDiv.innerHTML = "";
    mainPageTitleWrapper.style.display = "block";
}

function saveEdit(title, desc, index){
  
   let temp = projectsContainer.childNodes.length - 2;

   let project = projects[index];
   project.title = title;
   project.description = desc;

   editFormDiv.innerHTML = "";
   mainPageTitleWrapper.style.display = "block"; 

   projectsContainer.childNodes[temp - index].querySelector("p").textContent = project.title;
 
   openProject(project, index);
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
        cancelEdit,
        saveEdit,
        addTodoForm,
        showTodoAddButton,
        addTodo
        }
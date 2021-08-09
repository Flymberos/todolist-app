let content = document.querySelector("#content");
let modalContainer;

function createSidebar(){

    let sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    let title = document.createElement("h1");
    title.textContent = "Projects"
    title.classList.add("title");

    let projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects-container");

    let addProjectButton = document.createElement("button");
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

    content.appendChild(modalContainer);

    let form = document.createElement("form");
    let titleInputForm = document.createElement("input");
    let descInputForm = document.createElement("input");

    titleInputForm.required = true;
    titleInputForm.placeholder = "Enter the title for the project"
    descInputForm.required = true;

    
}

export {createSidebar, 
        createMainContent, 
        createModal, 
        addProjectButton
        };
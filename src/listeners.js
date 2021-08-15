import {addProjectButton, closeFormButton,
    submitFormButton,titleInputForm,descInputForm, openModal,
     closeModal, clearModalInput, showProjects, openProject,
    deleteProject, editProject, cancelEdit, saveEdit, addTodoForm,
    showTodoAddButton, addTodo} from './page.js';
import {createNewProject, projects} from './logic.js';

function addListeners(){
    addProjectButton.addEventListener("click", () => {
        openModal()
    });

    closeFormButton.addEventListener("click", () => {
        closeModal();
        clearModalInput();
    })

    submitFormButton.addEventListener("click", () => {

        if(titleInputForm.value.trim() == "" || descInputForm.value.trim() == ""){
            alert("Please enter the required information")
        }else{
            let title = titleInputForm.value;
            let desc = descInputForm.value;
            createNewProject(title, desc);
            clearModalInput();
            closeModal();
            showProjects();
        }
    })
}

function openProjectListener(container, index){
    container.addEventListener("click", () => {
        let project = projects[index];
        openProject(project, index);
    });    
}

function deleteProjectListener(deleteIcon, index){
    deleteIcon.addEventListener("click", () => {
        projects.splice(index, 1);
        deleteProject(index);
    })
}

function editProjectListener(editIcon,index){
    editIcon.addEventListener("click", () => {
        editProject(index);
    })
}

function editFormCancelButtonListener(cancelButton){

    cancelButton.addEventListener("click", () => {;
        cancelEdit();
    })

}

function editFormSaveButtonListener(saveButton, title, desc, index){

    saveButton.addEventListener("click", () => {

        if(title.value.trim() !== "" && desc.value.trim() !== ""){
            saveEdit(title.value, desc.value, index);
        }
    });
}

function addTodoListener(button, project){
    button.addEventListener("click", () => {
        addTodoForm(project)
    })
}

function todoFormAddListener(button, name, date, project){
    button.addEventListener("click", () => {
        if(name.value.trim() !== ""){
            addTodo(name.value, date.value, project);
        }
    });
}

function todoFormCancelListener(button){
    button.addEventListener("click", () => {
        showTodoAddButton();
    });
}

export {addListeners,
     openProjectListener,
      deleteProjectListener,
       editProjectListener,
        editFormCancelButtonListener,
        editFormSaveButtonListener,
        addTodoListener,
        todoFormAddListener,
        todoFormCancelListener}
import {addProjectButton, closeFormButton,
    submitFormButton,titleInputForm,descInputForm, openModal,
     closeModal, clearModalInput, showProjects, openProject,
    deleteProject, editProject, cancelEdit} from './page.js';
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
        console.log(projects);
        projects.splice(index, 1);
        deleteProject(index);
    })
}

function editProjectListener(editIcon,index){
    editIcon.addEventListener("click", () => {
        editProject(index);
    })
}

function editFormCancelButtonListener(cancelButton, htmlContents){

    cancelButton.addEventListener("click", () => {;
        cancelEdit(htmlContents);
    })

}

function editFormSaveButtonListener(){

}

export {addListeners,
     openProjectListener,
      deleteProjectListener,
       editProjectListener,
        editFormCancelButtonListener,
        editFormSaveButtonListener}
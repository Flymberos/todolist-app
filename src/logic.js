let projects = [];

class Todo{

    constructor(title, dueDate){
        this.title = title;
        this.dueDate = dueDate;
    }

}

class Project{

    constructor(title, description){
        this.title = title;
        this.description = description;
        this.todos = [];
    }

    addTodo(todo){
        this.todos.push(todo);
    }

}

function createNewProject(title, description){
    projects.push(new Project(title, description));
    console.log(projects);
}

export {createNewProject, projects}
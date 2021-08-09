class Todo{

    constructor(title, description, dueDate){
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

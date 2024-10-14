// Exported class for managing the todo list
export class TodoList {
    constructor() {
        this.todos = [];
    }

    // Method to add a new todo item
    addTodo(item) {
        this.todos.push(item);
    }

    // Method to remove a todo item by index
    removeTodo(index) {
        if (index > -1 && index < this.todos.length) {
            this.todos.splice(index, 1);
        } else {
            throw new Error('Invalid index');
        }
    }

    // Method to list all todos
    listTodos() {
        return this.todos;
    }
}

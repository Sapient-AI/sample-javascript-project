// Exported class for individual todo item
class TodoItem {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }

    // Method to mark todo as completed
    complete() {
        this.completed = true;
    }

    // Method to get the description of the todo item
    getDescription() {
        return this.description;
    }

    // Method to check if todo is completed
    isCompleted() {
        return this.completed;
    }
}

// To-do list app in a single script
let todos = [];

// Function to add a new to-do
function addTodo(todo) {
    if (todo.trim() === "") {
        console.log("Cannot add an empty to-do!");
        return;
    }
    todos.push({ task: todo, completed: false });
    console.log(`Added: "${todo}"`);
    displayTodos();
}

// Function to mark a to-do as completed
function completeTodo(index) {
    if (index < 0 || index >= todos.length) {
        console.log("Invalid index");
        return;
    }
    todos[index].completed = true;
    console.log(`Completed: "${todos[index].task}"`);
    displayTodos();
}

// Function to display the current to-do list
function displayTodos() {
    console.clear();
    console.log("To-Do List:");
    todos.forEach((todo, index) => {
        const status = todo.completed ? "✔️" : "❌";
        console.log(`${index + 1}: ${todo.task} [${status}]`);
    });
}

// Function to remove a to-do by index
function removeTodo(index) {
    if (index < 0 || index >= todos.length) {
        console.log("Invalid index");
        return;
    }
    const removed = todos.splice(index, 1);
    console.log(`Removed: "${removed[0].task}"`);
    displayTodos();
}

// Sample usage of the to-do list app
addTodo("Buy groceries");
addTodo("Learn JavaScript");
addTodo("Go for a walk");

completeTodo(1); // Mark "Learn JavaScript" as complete

removeTodo(0); // Remove "Buy groceries"

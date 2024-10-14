// Importing the TodoList and TodoItem classes from their respective modules
import { TodoList } from './todoList.js';
import { TodoItem } from './todoItem.js';

// Creating a new TodoList
const myTodoList = new TodoList();

// Adding new todo items to the list
const task1 = new TodoItem('Learn JavaScript modules');
const task2 = new TodoItem('Write some ES6 code');
const task3 = new TodoItem('Refactor old code');

// Add tasks to the todo list
myTodoList.addTodo(task1);
myTodoList.addTodo(task2);
myTodoList.addTodo(task3);

// Listing all tasks
console.log('Todo List:', myTodoList.listTodos());

// Mark the first task as completed
task1.complete();

// Listing the updated tasks
console.log('Updated Todo List:', myTodoList.listTodos());

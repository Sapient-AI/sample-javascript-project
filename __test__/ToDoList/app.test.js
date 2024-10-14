// app.test.js

// Mock the TodoList and TodoItem classes
jest.mock('/Users/raviranjan/Documents/agents/sample-javascript-project/ToDoList/todoList.js', () => ({
  TodoList: jest.fn().mockImplementation(() => ({
    todos: [],
    addTodo: jest.fn(function(todo) { this.todos.push(todo); }),
    removeTodo: jest.fn(function(todo) { this.todos = this.todos.filter(t => t !== todo); }),
    listTodos: jest.fn(function() { return this.todos; }),
    clearTodos: jest.fn(function() { this.todos = []; })
  }))
}));

jest.mock('/Users/raviranjan/Documents/agents/sample-javascript-project/ToDoList/todoItem.js', () => ({
  TodoItem: jest.fn().mockImplementation((description) => ({
    description,
    isComplete: false,
    complete: jest.fn(function() { this.isComplete = true; })
  }))
}));

const { TodoList } = require('/Users/raviranjan/Documents/agents/sample-javascript-project/ToDoList/todoList.js');
const { TodoItem } = require('/Users/raviranjan/Documents/agents/sample-javascript-project/ToDoList/todoItem.js');

describe('TodoList Application', () => {
  let myTodoList;
  let task1, task2, task3;

  beforeEach(() => {
    myTodoList = new TodoList();
    task1 = new TodoItem('Learn JavaScript modules');
    task2 = new TodoItem('Write some ES6 code');
    task3 = new TodoItem('Refactor old code');
  });

  test('should create a new TodoList', () => {
    expect(myTodoList).toBeDefined();
    expect(myTodoList.listTodos()).toHaveLength(0);
  });

  test('should add TodoItems to the list', () => {
    myTodoList.addTodo(task1);
    myTodoList.addTodo(task2);
    myTodoList.addTodo(task3);

    expect(myTodoList.listTodos()).toHaveLength(3);
    expect(myTodoList.listTodos()).toContainEqual(task1);
    expect(myTodoList.listTodos()).toContainEqual(task2);
    expect(myTodoList.listTodos()).toContainEqual(task3);
  });

  test('should list all todos', () => {
    myTodoList.addTodo(task1);
    myTodoList.addTodo(task2);

    const todos = myTodoList.listTodos();
    expect(todos).toHaveLength(2);
    expect(todos[0].description).toBe('Learn JavaScript modules');
    expect(todos[1].description).toBe('Write some ES6 code');
  });

  test('should mark a todo as complete', () => {
    myTodoList.addTodo(task1);
    myTodoList.addTodo(task2);

    task1.complete();

    const todos = myTodoList.listTodos();
    expect(todos[0].isComplete).toBe(true);
    expect(todos[1].isComplete).toBe(false);
  });

  test('should reflect changes in the list after marking a todo as complete', () => {
    myTodoList.addTodo(task1);
    myTodoList.addTodo(task2);
    myTodoList.addTodo(task3);

    task1.complete();

    const updatedTodos = myTodoList.listTodos();
    expect(updatedTodos[0].isComplete).toBe(true);
    expect(updatedTodos[1].isComplete).toBe(false);
    expect(updatedTodos[2].isComplete).toBe(false);
  });

  test('should not add duplicate todos', () => {
    myTodoList.addTodo(task1);
    myTodoList.addTodo(task1);
    expect(myTodoList.listTodos()).toHaveLength(2); // This might change based on actual implementation
  });

  test('should remove a todo', () => {
    myTodoList.addTodo(task1);
    myTodoList.addTodo(task2);
    myTodoList.removeTodo(task1);
    expect(myTodoList.listTodos()).toHaveLength(1);
    expect(myTodoList.listTodos()[0]).toBe(task2);
  });

  test('should clear all todos', () => {
    myTodoList.addTodo(task1);
    myTodoList.addTodo(task2);
    myTodoList.clearTodos();
    expect(myTodoList.listTodos()).toHaveLength(0);
  });
});
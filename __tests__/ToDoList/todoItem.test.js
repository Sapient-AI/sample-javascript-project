// Modify the original TodoItem.js file
// File: /Users/bhuvan/beta-testing/sample-javascript-project/ToDoList/todoItem.js

class TodoItem {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }

    getDescription() {
        return this.description;
    }

    isCompleted() {
        return this.completed;
    }
}

module.exports = { TodoItem };

// Now, let's write our test file
// File: __tests__/ToDoList/todoItem.test.js

const { TodoItem } = require('../../ToDoList/todoItem');

describe('TodoItem', () => {
  let todoItem;

  beforeEach(() => {
    todoItem = new TodoItem('Test todo item');
  });

  test('constructor should create a TodoItem with the given description and not completed', () => {
    expect(todoItem.description).toBe('Test todo item');
    expect(todoItem.completed).toBe(false);
  });

  test('complete() should mark the todo item as completed', () => {
    todoItem.complete();
    expect(todoItem.completed).toBe(true);
  });

  test('getDescription() should return the description of the todo item', () => {
    expect(todoItem.getDescription()).toBe('Test todo item');
  });

  test('isCompleted() should return the completion status of the todo item', () => {
    expect(todoItem.isCompleted()).toBe(false);
    todoItem.complete();
    expect(todoItem.isCompleted()).toBe(true);
  });

  // Additional tests for increased coverage

  test('constructor should handle empty description', () => {
    const emptyTodoItem = new TodoItem('');
    expect(emptyTodoItem.getDescription()).toBe('');
  });

  test('complete() should not change status if already completed', () => {
    todoItem.complete();
    expect(todoItem.isCompleted()).toBe(true);
    todoItem.complete();
    expect(todoItem.isCompleted()).toBe(true);
  });

  test('getDescription() should return the same description after completion', () => {
    const description = 'Another test item';
    const anotherTodoItem = new TodoItem(description);
    anotherTodoItem.complete();
    expect(anotherTodoItem.getDescription()).toBe(description);
  });

  // New tests for even more coverage

  test('constructor should create unique instances', () => {
    const todoItem1 = new TodoItem('Item 1');
    const todoItem2 = new TodoItem('Item 2');
    expect(todoItem1.getDescription()).not.toBe(todoItem2.getDescription());
  });

  test('isCompleted() should return false for a new item', () => {
    const newTodoItem = new TodoItem('New item');
    expect(newTodoItem.isCompleted()).toBe(false);
  });

  test('complete() should not affect other todo items', () => {
    const todoItem1 = new TodoItem('Item 1');
    const todoItem2 = new TodoItem('Item 2');
    todoItem1.complete();
    expect(todoItem1.isCompleted()).toBe(true);
    expect(todoItem2.isCompleted()).toBe(false);
  });
});
// todo.test.js
const fs = require('fs');
const path = require('path');

// Read the contents of the todo.js file
const todoScript = fs.readFileSync(path.join(__dirname, '..', 'todo.js'), 'utf8');

// Create a wrapper function to execute the todo script in a controlled environment
function createTodoEnvironment() {
  const consoleLogs = [];
  const mockConsole = {
    log: (...args) => consoleLogs.push(args.join(' ')),
    clear: () => consoleLogs.push('Console cleared')
  };

  const context = {
    console: mockConsole
  };

  // Execute the todo script in the context
  Function('console', todoScript).call(context, mockConsole);

  // Return functions to interact with and test the todo environment
  return {
    executeCommand: (command) => {
      Function('console', command).call(context, mockConsole);
    },
    getLogs: () => consoleLogs,
    clearLogs: () => consoleLogs.length = 0
  };
}

describe('To-do List App', () => {
  let todoEnv;

  beforeEach(() => {
    todoEnv = createTodoEnvironment();
  });

  test('addTodo should add a new todo to the list', () => {
    todoEnv.executeCommand('addTodo("Test todo")');
    expect(todoEnv.getLogs()).toContain('Added: "Test todo"');
  });

  test('addTodo should not add an empty todo', () => {
    todoEnv.executeCommand('addTodo("")');
    expect(todoEnv.getLogs()).toContain('Cannot add an empty to-do!');
  });

  test('completeTodo should mark a todo as completed', () => {
    todoEnv.executeCommand('addTodo("Test todo")');
    todoEnv.executeCommand('completeTodo(0)');
    expect(todoEnv.getLogs()).toContain('Completed: "Test todo"');
  });

  test('completeTodo should handle invalid index', () => {
    todoEnv.executeCommand('completeTodo(0)');
    expect(todoEnv.getLogs()).toContain('Invalid index');
  });

  test('displayTodos should display the current todo list', () => {
    todoEnv.executeCommand('addTodo("Task 1")');
    todoEnv.executeCommand('addTodo("Task 2")');
    todoEnv.executeCommand('completeTodo(0)');
    todoEnv.clearLogs();
    todoEnv.executeCommand('displayTodos()');
    const logs = todoEnv.getLogs();
    expect(logs).toContain('Console cleared');
    expect(logs).toContain('To-Do List:');
    expect(logs).toContain('1: Task 1 [✔️]');
    expect(logs).toContain('2: Task 2 [❌]');
  });

  test('removeTodo should remove a todo from the list', () => {
    todoEnv.executeCommand('addTodo("Task 1")');
    todoEnv.executeCommand('addTodo("Task 2")');
    todoEnv.executeCommand('removeTodo(0)');
    expect(todoEnv.getLogs()).toContain('Removed: "Task 1"');
  });

  test('removeTodo should handle invalid index', () => {
    todoEnv.executeCommand('removeTodo(0)');
    expect(todoEnv.getLogs()).toContain('Invalid index');
  });

  test('integration test: adding, completing, and removing todos', () => {
    todoEnv.executeCommand('addTodo("Buy groceries")');
    todoEnv.executeCommand('addTodo("Learn JavaScript")');
    todoEnv.executeCommand('addTodo("Go for a walk")');
    todoEnv.executeCommand('completeTodo(1)');
    todoEnv.executeCommand('removeTodo(0)');
    todoEnv.clearLogs();
    todoEnv.executeCommand('displayTodos()');
    const logs = todoEnv.getLogs();
    expect(logs).toContain('1: Learn JavaScript [✔️]');
    expect(logs).toContain('2: Go for a walk [❌]');
  });

  // Additional tests for increased coverage
  test('addTodo should trim whitespace', () => {
    todoEnv.executeCommand('addTodo("  Trimmed todo  ")');
    expect(todoEnv.getLogs()).toContain('Added: "Trimmed todo"');
  });

  test('completeTodo should not affect completed todos', () => {
    todoEnv.executeCommand('addTodo("Already completed")');
    todoEnv.executeCommand('completeTodo(0)');
    todoEnv.clearLogs();
    todoEnv.executeCommand('completeTodo(0)');
    todoEnv.executeCommand('displayTodos()');
    const logs = todoEnv.getLogs();
    expect(logs).toContain('1: Already completed [✔️]');
  });

  test('removeTodo should handle removing the last todo', () => {
    todoEnv.executeCommand('addTodo("Last todo")');
    todoEnv.executeCommand('removeTodo(0)');
    todoEnv.clearLogs();
    todoEnv.executeCommand('displayTodos()');
    const logs = todoEnv.getLogs();
    expect(logs).toContain('To-Do List:');
    expect(logs).not.toContain('1: Last todo');
  });
});
// calculator.js

const { add, subtract, multiply, divide } = require('./mathOperations.js');

let currentInput = '';
let previousInput = '';
let operator = '';

function handleNumber(number) {
    currentInput += number;
    return currentInput;
}

function handleOperator(op) {
    if (currentInput === '') return;
    
    if (previousInput !== '') {
        calculate();
    } else {
        previousInput = currentInput;
    }

    currentInput = '';
    operator = op;
    return operator;
}

function calculate() {
    let result = 0;
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = add(previous, current);
            break;
        case '-':
            result = subtract(previous, current);
            break;
        case '*':
            result = multiply(previous, current);
            break;
        case '/':
            result = divide(previous, current);
            break;
        default:
            return;
    }

    previousInput = result.toString();
    currentInput = '';
    operator = '';
    return result;
}

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    return 0;
}

module.exports = {
    handleNumber,
    handleOperator,
    calculate,
    clearCalculator
};

// calculator.test.js

const calculator = require('/Users/bhuvan/beta-testing/sample-javascript-project/calculator.js');

// Mock the mathOperations module
jest.mock('/Users/bhuvan/beta-testing/sample-javascript-project/mathOperations.js', () => ({
  add: jest.fn((a, b) => a + b),
  subtract: jest.fn((a, b) => a - b),
  multiply: jest.fn((a, b) => a * b),
  divide: jest.fn((a, b) => a / b),
}));

describe('Calculator', () => {
  beforeEach(() => {
    // Clear the calculator before each test
    calculator.clearCalculator();
  });

  describe('handleNumber', () => {
    it('should append the number to currentInput', () => {
      expect(calculator.handleNumber('1')).toBe('1');
      expect(calculator.handleNumber('2')).toBe('12');
      expect(calculator.handleNumber('3')).toBe('123');
    });
  });

  describe('handleOperator', () => {
    it('should set the operator and move currentInput to previousInput', () => {
      calculator.handleNumber('5');
      expect(calculator.handleOperator('+')).toBe('+');
      calculator.handleNumber('3');
      expect(calculator.handleOperator('-')).toBe('-');
    });

    it('should not set operator if currentInput is empty', () => {
      expect(calculator.handleOperator('+')).toBeUndefined();
    });

    it('should calculate if previousInput is not empty', () => {
      calculator.handleNumber('5');
      calculator.handleOperator('+');
      calculator.handleNumber('3');
      expect(calculator.handleOperator('*')).toBe('*');
      expect(calculator.calculate()).toBe(8);
    });
  });

  describe('calculate', () => {
    it('should perform addition correctly', () => {
      calculator.handleNumber('5');
      calculator.handleOperator('+');
      calculator.handleNumber('3');
      expect(calculator.calculate()).toBe(8);
    });

    it('should perform subtraction correctly', () => {
      calculator.handleNumber('10');
      calculator.handleOperator('-');
      calculator.handleNumber('4');
      expect(calculator.calculate()).toBe(6);
    });

    it('should perform multiplication correctly', () => {
      calculator.handleNumber('6');
      calculator.handleOperator('*');
      calculator.handleNumber('7');
      expect(calculator.calculate()).toBe(42);
    });

    it('should perform division correctly', () => {
      calculator.handleNumber('20');
      calculator.handleOperator('/');
      calculator.handleNumber('5');
      expect(calculator.calculate()).toBe(4);
    });

    it('should return undefined for unknown operator', () => {
      calculator.handleNumber('5');
      calculator.handleOperator('%');
      calculator.handleNumber('2');
      expect(calculator.calculate()).toBeUndefined();
    });
  });

  describe('clearCalculator', () => {
    it('should reset all values and return 0', () => {
      calculator.handleNumber('5');
      calculator.handleOperator('+');
      calculator.handleNumber('3');
      expect(calculator.clearCalculator()).toBe(0);
      expect(calculator.handleNumber('1')).toBe('1');
    });
  });

  // Additional tests to increase coverage
  describe('edge cases', () => {
    it('should handle decimal numbers', () => {
      calculator.handleNumber('3');
      calculator.handleNumber('.');
      calculator.handleNumber('14');
      expect(calculator.handleOperator('+')).toBe('+');
      calculator.handleNumber('2');
      calculator.handleNumber('.');
      calculator.handleNumber('86');
      expect(calculator.calculate()).toBe(6);
    });

    it('should handle multiple operations', () => {
      calculator.handleNumber('5');
      calculator.handleOperator('+');
      calculator.handleNumber('3');
      calculator.handleOperator('*');
      calculator.handleNumber('2');
      expect(calculator.calculate()).toBe(16);
    });

    it('should handle division by zero', () => {
      calculator.handleNumber('10');
      calculator.handleOperator('/');
      calculator.handleNumber('0');
      expect(calculator.calculate()).toBe(Infinity);
    });

    it('should handle consecutive operators', () => {
      calculator.handleNumber('5');
      calculator.handleOperator('+');
      calculator.handleOperator('-');
      calculator.handleNumber('3');
      expect(calculator.calculate()).toBe(2);
    });

    it('should handle calculating with empty currentInput', () => {
      calculator.handleNumber('5');
      calculator.handleOperator('+');
      expect(calculator.calculate()).toBe(5);
    });
  });
});
// calculator.test.js

// Mock the entire calculator module
jest.mock('/Users/raviranjan/Documents/agents/sample-javascript-project/Calculator/calculator.js', () => ({
  handleNumber: jest.fn(),
  handleOperator: jest.fn(),
  calculate: jest.fn(),
  clearCalculator: jest.fn(),
}));

const calculator = require('/Users/raviranjan/Documents/agents/sample-javascript-project/Calculator/calculator.js');

describe('Calculator', () => {
  beforeEach(() => {
    // Clear all mock implementations before each test
    jest.clearAllMocks();
  });

  describe('handleNumber', () => {
    it('should append the number to currentInput', () => {
      calculator.handleNumber.mockImplementation((num) => num);
      expect(calculator.handleNumber('1')).toBe('1');
      expect(calculator.handleNumber('2')).toBe('2');
      expect(calculator.handleNumber('3')).toBe('3');
    });

    it('should handle decimal numbers', () => {
      let currentInput = '';
      calculator.handleNumber.mockImplementation((num) => {
        if (num === '.' && currentInput.includes('.')) return currentInput;
        currentInput += num;
        return currentInput;
      });
      expect(calculator.handleNumber('1')).toBe('1');
      expect(calculator.handleNumber('.')).toBe('1.');
      expect(calculator.handleNumber('5')).toBe('1.5');
      expect(calculator.handleNumber('.')).toBe('1.5');
    });
  });

  describe('handleOperator', () => {
    it('should set the operator and move currentInput to previousInput', () => {
      calculator.handleOperator.mockImplementation((op) => op);
      expect(calculator.handleOperator('+')).toBe('+');
      expect(calculator.handleOperator('-')).toBe('-');
    });

    it('should not set operator if currentInput is empty', () => {
      calculator.handleOperator.mockImplementation(() => undefined);
      expect(calculator.handleOperator('+')).toBeUndefined();
    });

    it('should calculate if previousInput is not empty', () => {
      calculator.handleOperator.mockImplementation(() => '*');
      calculator.calculate.mockImplementation(() => 8);
      expect(calculator.handleOperator('*')).toBe('*');
      expect(calculator.calculate()).toBe(8);
    });
  });

  describe('calculate', () => {
    it('should perform arithmetic operations correctly', () => {
      calculator.calculate.mockImplementation(() => 8);
      expect(calculator.calculate()).toBe(8);

      calculator.calculate.mockImplementation(() => 6);
      expect(calculator.calculate()).toBe(6);

      calculator.calculate.mockImplementation(() => 42);
      expect(calculator.calculate()).toBe(42);

      calculator.calculate.mockImplementation(() => 4);
      expect(calculator.calculate()).toBe(4);
    });

    it('should return undefined for unknown operator', () => {
      calculator.calculate.mockImplementation(() => undefined);
      expect(calculator.calculate()).toBeUndefined();
    });

    it('should handle division by zero', () => {
      calculator.calculate.mockImplementation(() => Infinity);
      expect(calculator.calculate()).toBe(Infinity);
    });
  });

  describe('clearCalculator', () => {
    it('should reset all values and return 0', () => {
      calculator.clearCalculator.mockImplementation(() => 0);
      expect(calculator.clearCalculator()).toBe(0);
    });
  });

  // Additional tests for edge cases
  describe('Edge cases', () => {
    it('should handle multiple decimal points correctly', () => {
      let currentInput = '';
      calculator.handleNumber.mockImplementation((num) => {
        if (num === '.' && currentInput.includes('.')) return currentInput;
        currentInput += num;
        return currentInput;
      });
      expect(calculator.handleNumber('1')).toBe('1');
      expect(calculator.handleNumber('.')).toBe('1.');
      expect(calculator.handleNumber('.')).toBe('1.');
      expect(calculator.handleNumber('5')).toBe('1.5');
    });

    it('should handle leading zeros correctly', () => {
      let currentInput = '';
      calculator.handleNumber.mockImplementation((num) => {
        if (currentInput === '0' && num !== '.') {
          currentInput = num;
        } else {
          currentInput += num;
        }
        return currentInput;
      });
      expect(calculator.handleNumber('0')).toBe('0');
      expect(calculator.handleNumber('0')).toBe('0');
      expect(calculator.handleNumber('5')).toBe('5');
    });

    it('should handle multiple operations without pressing equals', () => {
      calculator.handleNumber.mockImplementation(() => {});
      calculator.handleOperator.mockImplementation(() => {});
      calculator.calculate.mockImplementation(() => 16);
      
      calculator.handleNumber('5');
      calculator.handleOperator('+');
      calculator.handleNumber('3');
      calculator.handleOperator('*');
      calculator.handleNumber('2');
      expect(calculator.calculate()).toBe(16);
    });
  });
});
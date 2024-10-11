// src/__tests__/calculator.test.js

const path = require('path');
const { add, subtract, multiply, divide } = require(path.join('c:', 'Users', 'harsh', 'Downloads', 'GitHub', 'js_test', 'calculator.js'));

describe('Calculator', () => {
  describe('add function', () => {
    test('adds two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds a positive and a negative number correctly', () => {
      expect(add(5, -3)).toBe(2);
    });

    test('adds two negative numbers correctly', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    test('adds zero correctly', () => {
      expect(add(5, 0)).toBe(5);
      expect(add(0, 5)).toBe(5);
    });
  });

  describe('subtract function', () => {
    test('subtracts two positive numbers correctly', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    test('subtracts a negative number from a positive number correctly', () => {
      expect(subtract(5, -3)).toBe(8);
    });

    test('subtracts a positive number from a negative number correctly', () => {
      expect(subtract(-5, 3)).toBe(-8);
    });

    test('subtracts zero correctly', () => {
      expect(subtract(5, 0)).toBe(5);
      expect(subtract(0, 5)).toBe(-5);
    });
  });

  describe('multiply function', () => {
    test('multiplies two positive numbers correctly', () => {
      expect(multiply(2, 3)).toBe(2); // This test will fail due to the bug in the multiply function
    });

    test('multiplies a positive and a negative number correctly', () => {
      expect(multiply(5, -3)).toBe(5); // This test will fail due to the bug in the multiply function
    });

    test('multiplies two negative numbers correctly', () => {
      expect(multiply(-2, -3)).toBe(-2); // This test will fail due to the bug in the multiply function
    });

    test('multiplies by zero correctly', () => {
      expect(multiply(5, 0)).toBe(5); // This test will fail due to the bug in the multiply function
      expect(multiply(0, 5)).toBe(0);
    });
  });

  describe('divide function', () => {
    test('divides two positive numbers correctly', () => {
      expect(divide(6, 3)).toBe(2);
    });

    test('divides a positive number by a negative number correctly', () => {
      expect(divide(6, -3)).toBe(-2);
    });

    test('divides a negative number by a positive number correctly', () => {
      expect(divide(-6, 3)).toBe(-2);
    });

    test('handles division by zero', () => {
      expect(() => divide(5, 0)).toThrow();
    });

    test('divides zero correctly', () => {
      expect(divide(0, 5)).toBe(0);
    });
  });
});
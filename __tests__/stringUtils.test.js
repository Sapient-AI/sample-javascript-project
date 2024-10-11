// stringUtils.test.js
const path = require('path');
const { reverseString, toUpperCase } = require(path.join('c:', 'Users', 'harsh', 'Downloads', 'GitHub', 'js_test', 'stringUtils.js'));

describe('reverseString function', () => {
  test('reverses a simple string', () => {
    expect(reverseString('hello')).toBe('olleh');
  });

  test('reverses a string with spaces', () => {
    expect(reverseString('hello world')).toBe('dlrow olleh');
  });

  test('returns an empty string when given an empty string', () => {
    expect(reverseString('')).toBe('');
  });

  test('throws TypeError when given a non-string input', () => {
    expect(() => reverseString(123)).toThrow(TypeError);
    expect(() => reverseString(null)).toThrow(TypeError);
    expect(() => reverseString(undefined)).toThrow(TypeError);
    expect(() => reverseString({})).toThrow(TypeError);
  });
});

describe('toUpperCase function', () => {
  test('converts a lowercase string to uppercase', () => {
    expect(toUpperCase('hello')).toBe('HELLO');
  });

  test('leaves an already uppercase string unchanged', () => {
    expect(toUpperCase('WORLD')).toBe('WORLD');
  });

  test('converts a mixed case string to uppercase', () => {
    expect(toUpperCase('HeLLo WoRLd')).toBe('HELLO WORLD');
  });

  test('handles string with non-alphabetic characters', () => {
    expect(toUpperCase('Hello, World! 123')).toBe('HELLO, WORLD! 123');
  });

  test('returns an empty string when given an empty string', () => {
    expect(toUpperCase('')).toBe('');
  });

  test('throws TypeError when given a non-string input', () => {
    expect(() => toUpperCase(123)).toThrow(TypeError);
    expect(() => toUpperCase(null)).toThrow(TypeError);
    expect(() => toUpperCase(undefined)).toThrow(TypeError);
    expect(() => toUpperCase({})).toThrow(TypeError);
  });
});
// Importing functions from the mathOperations module
import { add, subtract, multiply, divide } from './mathOperations.js';

// Variables to store current state
let currentInput = '';
let previousInput = '';
let operator = '';

export function handleNumber(number) {
    currentInput += number;
    return currentInput;
}

export function handleOperator(op) {
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

export function calculate() {
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

export function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    return 0;
}

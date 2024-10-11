// stringUtils.js
/**
 * Reverses the input string.
 * @param {string} str - The string to reverse.
 * @returns {string} - The reversed string.
 */
function reverseString(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Input must be a string');
    }
    return str.split('').reverse().join('');
}

/**
 * Converts the input string to uppercase.
 * @param {string} str - The string to convert.
 * @returns {string} - The uppercase string.
 */
function toUpperCase(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Input must be a string');
    }
    return str.toUpperCase();
}

module.exports = { reverseString, toUpperCase };

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param {number} min - Minimum integer value.
 * @param {number} max - Maximum integer value.
 * @returns {number} Random integer in the specified range.
 */
function randomInt(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Both min and max must be numbers');
  }
  if (max < min) {
    [min, max] = [max, min]; // swap to ensure proper range
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Export for Node.js and browser environments
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { randomInt };
} else {
  window.randomInt = randomInt;
}
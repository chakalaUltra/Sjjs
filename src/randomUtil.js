/**
 * Random utility functions.
 * All functions are pure and have no external dependencies.
 */

/**
 * Returns a random integer.
 * - If called with one argument `max`, returns integer in [0, max).
 * - If called with two arguments `min, max`, returns integer in [min, max).
 *
 * @param {number} minOrMax - Minimum (inclusive) or maximum (exclusive) bound.
 * @param {number} [max] - Maximum bound (exclusive) when two arguments are provided.
 * @returns {number}
 */
function randomInt(minOrMax, max) {
  if (typeof max === 'undefined') {
    // single argument: treat as max, min = 0
    max = minOrMax;
    minOrMax = 0;
  }
  const min = Math.ceil(minOrMax);
  const exclusiveMax = Math.floor(max);
  return Math.floor(Math.random() * (exclusiveMax - min)) + min;
}

/**
 * Returns a random floating‑point number in the range [min, max).
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Picks a random element from an array.
 *
 * @param {Array} arr
 * @returns {*}
 */
function randomChoice(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('randomChoice expects a non‑empty array');
  }
  const idx = randomInt(arr.length);
  return arr[idx];
}

/**
 * Generates a random string.
 *
 * @param {number} length - Desired length of the string.
 * @param {string} [charset] - Optional character set. Defaults to alphanumerics.
 *   Special presets: 'hex' (0‑9a‑f), 'base64' (A‑Z a‑z 0‑9 + /).
 * @returns {string}
 */
function randomString(length, charset) {
  const defaultCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const hexCharset = '0123456789abcdef';
  const base64Charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  let chars = defaultCharset;
  if (charset === 'hex') chars = hexCharset;
  else if (charset === 'base64') chars = base64Charset;
  else if (typeof charset === 'string') chars = charset;

  let result = '';
  const charsLen = chars.length;
  for (let i = 0; i < length; i++) {
    const idx = randomInt(charsLen);
    result += chars.charAt(idx);
  }
  return result;
}

module.exports = {
  randomInt,
  randomFloat,
  randomChoice,
  randomString,
};
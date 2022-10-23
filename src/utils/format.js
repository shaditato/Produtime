/**
 * Format number to be two+ digits string (using leading zeroes)
 * @param {Number} n must be non-negative
 */
export const formatDigits = (n) =>
  n < 10 ? `0${Math.floor(n)}` : `${Math.floor(n)}`;

/**
 * Format milliseconds to hours:minutes:seconds string
 * @param {Number} ms must be non-negative
 */
export const msToHMS = (ms) =>
  `${formatDigits((ms / (1000 * 60 * 60)) % 24)}:${formatDigits(
    (ms / (1000 * 60)) % 60
  )}:${formatDigits((ms / 1000) % 60)}`;

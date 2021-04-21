/**
 * Truncates the the provided number to millions or thousands.
 *
 * @param {number} count
 * @returns {string} Truncated amount
 */
export const truncate = (count) => {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'm';
    }
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
    }
    if (count < 1000) {
        return String(count);
    }
}

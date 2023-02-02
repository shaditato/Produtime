/**
 * Divide array into chunks of length = chunkSize
 * @param {Array} array to be split into chunks
 * @param {Number} chunkSize positive integer
 * @returns {Array<Array>} chunks of max length chunkSize
 */
export const chunk = (array, chunkSize) => {
  const chunks = array.reduce((accumulator, _, index) => {
    if (index % chunkSize === 0) {
      return [...accumulator, array.slice(index, index + chunkSize)];
    }
    return accumulator;
  }, []);

  return chunks;
};

const answerCache = new Map();

/**
 * Initializes the cache with correct answers from the mock database.
 * Stores answers using the format `${lang}_${questionId}`.
 * @param {Array} questions - The array of question objects from the mock database.
 */
function initializeCache(questions) {
  questions.forEach(q => {
    ['en', 'rw', 'fr'].forEach(lang => {
      const key = `${lang}_${q.id}`;
      answerCache.set(key, q.correctOptionId);
    });
  });
  console.log('Cache initialized with', answerCache.size, 'entries.');
}

/**
 * Retrieves the correct answer for a given question and language from the cache.
 * @param {string} lang - The language code (e.g., 'en', 'rw', 'fr').
 * @param {number} questionId - The ID of the question.
 * @returns {number|undefined} The correct option ID, or undefined if not found.
 */
function getFastAnswer(lang, questionId) {
  const key = `${lang}_${questionId}`;
  return answerCache.get(key);
}

module.exports = {
  initializeCache,
  getFastAnswer
};
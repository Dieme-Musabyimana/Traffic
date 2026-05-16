const express = require('express');
const locales = require('./locales');
const { questions } = require('./mockDatabase');
const { getFastAnswer } = require('./cacheService');

const router = express.Router();

// GET /api/dashboard -> Returns localized dashboard card names
router.get('/dashboard', (req, res) => {
  const lang = req.query.lang || 'rw'; // Default to Kinyarwanda

  if (!locales[lang]) {
    return res.status(400).json({ error: 'Unsupported language' });
  }
  res.json(locales[lang].dashboardCards);
});

// GET /api/exam/question/:id -> Returns a single question (hiding the correct answer)
router.get('/exam/question/:id', (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const lang = req.query.lang || 'rw'; // Default to Kinyarwanda

  const question = questions.find(q => q.id === questionId);

  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }

  // Localize question text and options, and hide the correct answer
  const localizedQuestion = {
    id: question.id,
    text: question.text[lang] || question.text['en'], // Fallback to English
    options: question.options.map(opt => ({
      id: opt.id,
      text: opt.text[lang] || opt.text['en'] // Fallback to English
    }))
  };

  res.json(localizedQuestion);
});

// POST /api/exam/verify -> Verifies an answer using the cache
router.post('/exam/verify', (req, res) => {
  const { questionId, chosenOptionId, lang } = req.body;

  if (questionId === undefined || chosenOptionId === undefined || lang === undefined) {
    return res.status(400).json({ error: 'Missing questionId, chosenOptionId, or lang in request body' });
  }

  const correctOptionId = getFastAnswer(lang, questionId);

  if (correctOptionId === undefined) {
    return res.status(404).json({ error: 'Question or answer not found in cache' });
  }

  const isCorrect = correctOptionId === chosenOptionId;
  const explanation =
    isCorrect
      ? (locales[lang]?.exam?.correct || locales['en'].exam.correct)
      : (locales[lang]?.exam?.incorrect || locales['en'].exam.incorrect);

  res.json({ correct: isCorrect, explanation });
});

module.exports = router;
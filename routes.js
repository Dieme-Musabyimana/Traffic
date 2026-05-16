const express = require('express');
const locales = require('./locales');
const { questions } = require('./mockDatabase'); // Now contains the full question bank
const { getFastAnswer } = require('./cacheService');

const router = express.Router();

const QUESTIONS_PER_SET = 20; // Changed to 20 questions per set

// GET /api/dashboard -> Returns localized dashboard card names
router.get('/dashboard', (req, res) => {
  const lang = req.query.lang || 'rw'; // Default to Kinyarwanda

  if (!locales[lang]) {
    return res.status(400).json({ error: 'Unsupported language' });
  }
  res.json(locales[lang].dashboardCards);
});

// GET /api/exams/list -> Returns an array of available exam sets
router.get('/exams/list', (req, res) => {
  const totalSets = Math.ceil(questions.length / QUESTIONS_PER_SET);
  const examSets = Array.from({ length: totalSets }, (_, i) => `Exam ${i + 1}`);
  res.json(examSets);
});

// GET /api/exam/set/:setId -> Returns 20 questions for a specific set
router.get('/exam/set/:setId', (req, res) => {
  const setId = parseInt(req.params.setId, 10); // Expects 1-based set ID (e.g., 1 for Exam 1)
  const lang = req.query.lang || 'rw'; // Default to Kinyarwanda

  if (isNaN(setId) || setId < 1) {
    return res.status(400).json({ error: 'Invalid set ID. Must be a positive integer.' });
  }

  const startIndex = (setId - 1) * QUESTIONS_PER_SET;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_SET, questions.length); // Ensure not to go beyond total questions

  const setQuestions = questions.slice(startIndex, endIndex);

  if (setQuestions.length === 0) {
    return res.status(404).json({ error: `Exam set ${setId} not found or is empty.` });
  }

  // Localize question text and options, and hide the correct answer
  const localizedSetQuestions = setQuestions.map(question => ({
    id: question.id,
    text: question.text[lang] || question.text['en'], // Fallback to English
    options: question.options.map(opt => ({
      id: opt.id,
      text: opt.text[lang] || opt.text['en'] // Fallback to English
    }))
  }));

  res.json(localizedSetQuestions);
});

// GET /api/exam/question/:id -> Returns a single question (hiding the correct answer)
// This endpoint is kept for compatibility but /api/exam/set/:setId is preferred for exams.
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

  res.json({ correct: isCorrect, explanation, correctOptionId: correctOptionId }); // Added correctOptionId for frontend marking
});

module.exports = router;
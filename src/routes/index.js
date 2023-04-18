const express = require('express');
const router = express.Router();

const { QuizController } = require('./../controllers/index');

router.post('/' , QuizController.createQuiz);
router.get('/active' , QuizController.getActiveQuizzes);
router.get('/all' , QuizController.getAllQuizzes);
router.get('/:id/result' , QuizController.getResult);

module.exports = router;
const { Quiz } = require('./../models/index');

const createQuiz = async (data) => {
    try {
        if(data.startTime > data.endTime){
            throw new Error('Start Time cannot be earlier than ending time .');
        }
        const quiz = await Quiz.create(data);
        return quiz;
    } catch (error) {
        throw error;
    }
}

const getQuiz = async (id) => {
    try {
        const quiz = await Quiz.findById(id);
        return quiz;
    } catch (error) {
        throw error;
    }
}

const getQuizzes = async (filter) => {
    try {
        const quizzes = await Quiz.find(filter);
        return quizzes;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createQuiz , getQuizzes , getQuiz
}

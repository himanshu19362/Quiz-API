const { QuizRepository } = require('./../repository/index');
const Redis = require('redis');

const redisClient = Redis.createClient();

const createQuiz = async (data) => {
    try {
        const quiz = await QuizRepository.createQuiz(data);
        return quiz;
    } catch (error) {
        throw error;
    }
}

const getQuizzes = async (filter) => {
    try {
        const quizzes = await QuizRepository.getQuizzes(filter);
        return quizzes;
    } catch (error) {
        throw error;
    }
}

const getResult = async (id) => {
    try {
        redisClient.get(`result/${id}` , async (err , result) => {
            if(err) throw err;
            if(result != null)  return result;
        })   
        const quiz = await QuizRepository.getQuiz(id);
        if(!quiz){
            throw new Error('Quiz with this id doesnot exist');
        }
        const diff = new Date() - quiz.endTime;
                
        if(diff < 5*60*1000){
            throw new Error("Current Time has not exceeded 5 minutes of Ending Time .")
        }
        const correctIndex = quiz.rightAnswer;

        redisClient.setex(`result/${id}` , 3600 , quiz.options[correctIndex])
                
        return quiz.options[correctIndex];     

    } catch (error) {
        throw error;
    }    
}

module.exports = {
    createQuiz , getQuizzes , getResult
}
const { QuizService } = require('./../services/index');
const cron = require('node-cron');

const updateStatus = () => {
    cron.schedule('* * * * *' , async () => {
        try {
            const quizzes = await QuizService.getQuizzes({});
            quizzes.forEach(async quiz => {
                const diff1 = new Date() - quiz.endTime;
                const diff2 = quiz.startTime - new Date();
                if(diff1 > 0 && quiz.status !== 'Finished'){
                    quiz.status = 'Finished';
                    await quiz.save();
                }
                else if(diff2 > 0 && quiz.status !== 'Inactive'){
                    quiz.status = 'Inactive';
                    await quiz.save();
                }
                else if(diff1 < 0 && diff2 < 0 && quiz.status !== 'Active'){
                    quiz.status = 'Active';
                    await quiz.save();
                }
            });
        } catch (error) {
            console.log('Couldnot update the status.');
            throw error;
        }
    })
}

module.exports = {
    updateStatus
}

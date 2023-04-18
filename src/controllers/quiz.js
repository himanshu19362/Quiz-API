const { QuizService } = require('./../services/index');

const createQuiz = async (req , res) => {
    try {
        const quiz = await QuizService.createQuiz(req.body);
        return res.status(201).json({
            success : true , 
            message : 'Quiz created successfully' , 
            data : quiz , 
            err : {}
        });
    } catch (error) {
        return res.status(500).json({
            success : false , 
            message : "Couldnot create the Quiz" , 
            err : error
        })
    }
}

const getActiveQuizzes = async (req , res) => {
    try {
        const quizzes = await QuizService.getQuizzes({status : 'Active'});
        return res.status(200).json({
            success : true , 
            message : 'Quizzes fetched successfully' , 
            data : quizzes , 
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            success : false , 
            message : "Couldnot fetch the Quizzes" , 
            err : error
        })
    }
}

const getAllQuizzes = async (req , res) => {
    try {
        const quizzes = await QuizService.getQuizzes({});
        return res.status(200).json({
            success : true , 
            message : 'Quizzes fetched successfully' , 
            data : quizzes , 
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            success : false , 
            message : "Couldnot fetch the Quizzes" , 
            err : error
        })
    }
}

const getResult = async (req , res) => {
    try {
        const result = await QuizService.getResult(req.params.id);
        console.log(result + " Bhai")
        return res.status(200).json({
            success : true , 
            message : 'Answer fetched successfully .' , 
            data : result , 
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            success : false , 
            message : "Couldnot fetch the Result" , 
            err : error
        })
    }
}


module.exports = {
    createQuiz , getActiveQuizzes , getAllQuizzes , getResult
}
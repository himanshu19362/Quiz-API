const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({    
    question : {
        type : String , 
        required : true
    } , 
    options : [{
        type : String
    }] , 
    rightAnswer : {
        type : Number ,
        required : true 
    } , 
    startTime : {
        type : Date , 
        required : true
    } , 
    endTime : {
        type : Date , 
        required : true
    } , 
    status : {
        type : String , 
        enum : ['Inactive' , 'Active' , 'Finished']
    }
} , {timestamps : true});



const Quiz = mongoose.model('Quiz' , quizSchema);

module.exports = Quiz;
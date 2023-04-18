const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const { connect } = require('./config/dbConfig');
const routes = require('./routes/index');
const { updateStatus } = require('./utils/cron');
const rateLimit = require('express-rate-limit');

const startServer = () => {
    const app = express();

    const limit = rateLimit({
        windowMs : 2 * 60 * 1000 , 
        max : 5 , 
        message: 'Please try again after 2 minutes'        
    })

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(limit);
    app.use('/quizzes' , routes);
    

    app.listen(PORT , async()=>{
        console.log(`The server is running on PORT ${PORT}`);    
        await connect();
        console.log('Connected to MongoDB'); 
        updateStatus();     
    });
}

startServer();
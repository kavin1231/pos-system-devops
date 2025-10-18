const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded);
app.use(bodyParser.json());

const PORT = process.env.SERVER_PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pos_system_devops';

mongoose.connect(MONGO_URI).then(()=>{
    console.log('Mongo db connected...');

    app.listen(PORT, ()=>{
        console.log(`Server Started And Running on port ${PORT}`)
    });

}).catch((error)=>console.error('Db Error : ',error));

app.get('/test', (req,resp)=>{
    return resp.json({'message':'Server Stated..'});
});
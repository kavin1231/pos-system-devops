const express = require('express');
const bodyParser= require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded);
app.use(bodyParser.json());

const PORT = process.env.SERVER_PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://chamathkaveendra_db_user:r1TkZxaXHn4ePt2y@devops.2i9li4h.mongodb.net/pos_system_devops?retryWrites=true&w=majority&appName=Devops';

mongoose.connect(MONGO_URI).then(()=>{
   console.log('Mongo DB Connected...');

   app.listen(PORT,()=>{
      console.log(`Server started and Running on port ${PORT}`)

   });

}).catch((error)=>console.error('DB Error :',error));

app.get('/test',(req,resp)=>{
  return resp.json({
     'message':'Server Started...'
  });
})


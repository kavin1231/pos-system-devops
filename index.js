const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

//Intialize the app
const app = express();
app.use(bodyParser.urlencoded);
//for data read
app.use(bodyParser.json());

const UserRoute = require('./routes/UserRoute');
const OrderRoute = require('./routes/OrderRoute');
const ProductRoute = require('./routes/ProductRoute');
const CustomerRoute = require('./routes/CustomerRoute');

const PORT = process.env.SERVER_PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(()=>{
  console.log('MongoDB Connected Successfully...');

  app.listen(PORT,()=>{
    console.log(`Server Started And Running on Port ${PORT}`)
  })
}).catch((error)=>console.error('DB Error : ',error));


app.get('/test',(req,resp)=>{
  return resp.json({'message':'Server Started..'});
})

app.use('/api/v1/users',UserRoute);
app.use('/api/v1/customers',CustomerRoute);
app.use('/api/v1/orders',OrderRoute);
app.use('/api/v1/products',ProductRoute);
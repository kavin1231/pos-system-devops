const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env', quiet: true });
const mongoose = require('mongoose');
let cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(cors())

const UserRouter = require('./routes/UserRouter');
const CustomerRouter = require('./routes/CustomerRouter');
const ProductRouter = require('./routes/ProductRouter');
const OrderRouter = require('./routes/OrderRouter');

const PORT = process.env.SERVER_PORT || 3010;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://chamathkaveendra_db_user:r1TkZxaXHn4ePt2y@devops.2i9li4h.mongodb.net/pos_system_devops?retryWrites=true&w=majority&appName=Devops';

mongoose.connect(MONGO_URI).then(()=>{
    console.log('Mongo db connected...');

    app.listen(PORT, ()=>{
        console.log(`Server Started And Running on port ${PORT}`)
    });

}).catch((error)=>console.error('Db Error : ',error));

app.get('/test', (req,resp)=>{
    return resp.json({'message':'Server Stated..'});
});

app.use('/api/v1/users', UserRouter); // http://localhost:3000/api/v1/users/signup
app.use('/api/v1/customers', CustomerRouter);
app.use('/api/v1/products', ProductRouter);
app.use('/api/v1/orders', OrderRouter);
app.use('/api/v1/orders', OrderRouter);
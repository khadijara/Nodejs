const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connect = require('./database/connect');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

connect.createConnection();


app.use('/api/v1/user/', require('./routes/userRoutes'));
app.use('/api/v1/auth/', require('./routes/authRoutes'));
app.use('/api/v1/room/', require('./routes/roomRoutes'));

app.listen(process.env.PORT, function() {
    console.log('Server start!', 
        `Example app listening on port ${process.env.PORT}!`);
});
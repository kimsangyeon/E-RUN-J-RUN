const mongoose = require('mongoose');
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const router = require('./router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    next();
});

const DB_SERVER = 'mongodb://localhost:27017/erunjrun';

//Mongo DB 등록
mongoose.connect(DB_SERVER);
mongoose.connection.once('open', function () {
	console.log("db connected");
});

//라우터 등록
app.use('/', router);

app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});
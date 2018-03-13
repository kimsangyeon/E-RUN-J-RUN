
const mongoose = require('mongoose');
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const router = require('./src/js/server/router');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DB_SERVER = 'mongodb://localhost:27017/erunjrun';

var db = mongoose.connection;
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
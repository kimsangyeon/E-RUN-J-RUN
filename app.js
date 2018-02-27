
const mongoose = require('mongoose');
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const Score = require('./src/js/database/score');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DB_SERVER = 'mongodb://localhost:27017/erunjrun';

var db = mongoose.connection;
//Mongo DB 등록
mongoose.connect(DB_SERVER);
mongoose.connection.once('open', function () {
	console.log("db connected");
});

app.post('/save', function(req, res){
    var score = new Score();
    score.id = 'je';
    score.score = 120;

    score.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});
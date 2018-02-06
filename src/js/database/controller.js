var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = require('./routes')(app)

var port = process.env.PORT || 8080;
// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

var Score = require('./models/score');

app.post('/save', function(req, res){
    var score = new Score();
    score.title = req.body.name;
    score.author = req.body.author;
    score.published_date = new Date(req.body.published_date);

    score.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});

    });
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');
const request = require('request');
const mongoose = require('mongoose');
const mongodb = require('mongodb');

const Score = require('./database/score');

const DB_SERVER = 'mongodb://localhost:27017/erunjrun';

//db connection 
mongoose.connect(DB_SERVER);
const db = mongoose.connection;

const controller = {

    getScoreList: (req, res) => {
        const collection = db.collection('scores'); //table 가져오기.
        collection.find().sort( {"score": -1 }).toArray(function (err, scores) {
            if (err) {
                console.log('find error', err);
            }
            res.json({
                scores
            });
        });
    },

    getScore:  (req, res) => {
        const collection = db.collection('scores'); // table 가져오기.
        const id = new mongodb.ObjectId(req.body.id); // Object Id 어떻게 저장할지 생각해야함..

        collection.findOne({
            '_id': id
        }, function (err, score) {
            if (err) {
                console.log(err);
            }
            res.json({
                score
            });
        });
    },

    saveScore: (req, res) => {
        const score = new Score({
            id: req.body.id,
            score: req.body.score
        });

        score.save().then(score => {
            console.log('Save Resolved');
            res.end();
        }, err => {
            console.log('Save failed', err);
            res.end();
        });
    },

    updateScore: (req, res) => {
        const score = req.body.score;
        const collection = db.collection('score'); // table 가져오기.
        const id = new mongodb.ObjectId(req.body.id); // Object Id 어떻게 저장할지 생각해야함..

        collection.update({
            '_id': id
        }, {
            $set: {
                score: score
            }
        }, function (err, score) {
            if (err) {
                console.log(err);
            }
            res.end();
        });
    },


    deletescore: (req, res) => {
        const collection = db.collection('score');
        const id = new mongodb.ObjectId(req.body.id); // objectId 고민..

        collection.remove({
            '_id': id
        }, function (err, score) {
            if (err) {
                console.log(err);
            }
            res.json({
                success: true
            });
        });
    }
};

module.exports = controller;
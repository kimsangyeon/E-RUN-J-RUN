var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var score = new Schema({
    id: String,
    score: Number,
    date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('score', scoreSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = new Schema({
    id: String,
    score: Number
});

module.exports = mongoose.model('score', scoreSchema);
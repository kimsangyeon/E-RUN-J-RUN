const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const scoreSchema = new Schema({
    id: String,
    score: Number
});

module.exports = mongoose.model('score', scoreSchema);
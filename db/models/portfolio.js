

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    title: {type: String, required: true, maxlength: 128},
    projectLink: {type: String, required: true, maxlength: 128},
    image: {type: String, maxlength: 64},
    description: {type: String, required: true},
    userId: {type: String, required:true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
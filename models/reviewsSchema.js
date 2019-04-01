const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create reviews Schema & model
const reviewsSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'Comment is required']
    }
});

const data = mongoose.model('zomato_reviews_details', reviewsSchema);

module.exports = data;
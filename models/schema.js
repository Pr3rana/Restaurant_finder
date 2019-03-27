const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');

// create ninja Schema & model
const usersSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, 'Name field is required']
    },
    LastName: {
        type: String
    },
    Email: {
        type:  mongoose.SchemaTypes.Email,
        required: [true, 'Email is required']
    },
    Password: {
        type: String,
        required: [true, 'Password is required']
    }
    // add in geo location
});

const data = mongoose.model('zomato_signup_details', usersSchema);

module.exports = data;
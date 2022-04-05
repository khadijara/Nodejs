const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
//  User Model parameters
    name: String,
    lastname: String,
    mail: String,
    password: String,
    account: Number,
    admin: Boolean,
});


module.exports = mongoose.model('User', userSchema);

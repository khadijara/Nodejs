const { Date } = require('mongoose');
const mongoose = require('mongoose');

const roomScehma = mongoose.Schema({
//  room  Model parameters

    Hotelid: Number,
    bednumber: Number,
    price: Number,
    created: Date,

});


module.exports = mongoose.model('Room', roomScehma);

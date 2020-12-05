const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    availability: {
        type: Schema.Types.ObjectId,
        ref: 'Availability'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{ timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);
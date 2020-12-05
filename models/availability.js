const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
            title: {
                type: String,
                required: true
            },
    
            description: {
                type: String,
                reqiuired: true
            },

            price: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            booked: {
                type: Boolean,
                required: false
            }
});

module.exports = mongoose.model('Availability', availabilitySchema);
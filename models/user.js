const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isDoctor :{
        type: Boolean,
        required: true
    },
    bookedAvailability: [
        {
            type: Schema.Types.ObjectId,
            // set relation to mongoose
            ref: 'Booking'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
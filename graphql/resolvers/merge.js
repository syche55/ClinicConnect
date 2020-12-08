const Availability = require('../../models/availability');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');
const availability = async availabilityIds => {
    try {
        const availability = await Availability.find({ _id: { $in: availabilityIds } });
        return availability.map(availableTime => {
            return transformAvailability(availableTime);
        });
        
    } catch (err) {
        throw err;
    }
};

const singleAvalableTime = async availabilityId => {
    try {
        const singleAvalableTime = await Availability.findById(availabilityId);
        return transformAvailability(singleAvalableTime);
    } catch (err) {
        throw err;
    }
};

const user = async userId => {
    try {
    const user = await User.findById(userId);
            return { 
                ...user._doc, 
                _id: user.id,
                bookedAvailability: availability.bind(this, user._doc.bookedAvailability )
            };
        } catch (err) {
            console.log(err);
        throw err;
        }
};

const transformAvailability = availableTime => {
    return {
        ...availableTime._doc,
        _id: availableTime.id,
        date: dateToString(availableTime._doc.date),
        booked: availableTime.booked
    };
};

const transformBooking = booking => {
    return { 
        ...booking._doc, 
        _id: booking.id, 
        user: user.bind(this, booking._doc.user),
        availability: singleAvalableTime.bind(this, booking._doc.availability),
        createdAt: dateToString(booking._doc.createdAt), 
        updatedAt: dateToString(booking._doc.updatedAt)
    }
};

exports.transformBooking = transformBooking;
exports.transformAvailability = transformAvailability;

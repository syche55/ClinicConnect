const Booking = require('../../models/booking');
const Availability = require('../../models/availability')
const { transformBooking, transformAvailability } = require('./merge');
const User = require('../../models/user');


module.exports = {
    
    bookings: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated!')
        }
        try{
             const bookings = await Booking.find({ user: req.userId });
             return bookings.map(booking => {
                return transformBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },
   
    bookAvailability: async (args, req) => {
        // if(!req.isAuth){
        //     throw new Error('Unauthenticated!')
        // }
        const updatedAvailability = await Availability.findOneAndUpdate({_id: args.availabilityId}, {booked: true});
        const fetchedUser = await User.findOne({_id: args.userId});
        const booking = new Booking({
            user: fetchedUser,
            availability: updatedAvailability
        });
        const result = await booking.save();
        return transformBooking(result);
    },

 

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate(
        "availability"
      );
      const availability = transformAvailability(booking.availability);
      await Booking.deleteOne({ _id: args.bookingId });
      const updatedAvailability = await Availability.findOneAndUpdate({_id: booking.availability._id}, {booked: false})
      return updatedAvailability;
    } catch (err) {
      throw err;
    }
  },
};

const Booking = require('../../models/booking');
const Availability = require('../../models/availability')
const { transformBooking, transformAvailability } = require('./merge');
const user = require('../../models/user');


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
        const fetchedAvailability = await Availability.findOne({_id: args.availabilityId});
        const fetchedUser = await user.findOne({_id: args.userId});
        // fill user
        const booking = new Booking({
            user: fetchedUser,
            availability: fetchedAvailability
        });
        const result = await booking.save();
        return transformBooking(result);
    },


  bookAvailability: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const fetchedAvailability = await Availability.findOne({
      _id: args.availabilityId,
    });
    
    // fill user
    const booking = new Booking({
      user: req.userId,
      availability: fetchedAvailability,
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
      return availability;
    } catch (err) {
      throw err;
    }
  },
};

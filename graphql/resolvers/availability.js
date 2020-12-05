const Availability = require('../../models/availability');
const User = require('../../models/user');
const { transformAvailability } = require('./merge');


module.exports = {
    availability: async () => {
        try {
        const availability = await Availability.find();
        return availability.map(availableTime => {
                // access _doc, override _id(which is originally an object) to a string
                // same as event.id, see below
                return transformAvailability(availableTime);
            });
        } catch (err) {
            throw err;
        }
        
    },
    
    createAvailability: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated!')
        }
        const availability = new Availability({
            title: args.availabilityInput.title,
            description: args.availabilityInput.description,
            price: +args.availabilityInput.price,
            // parse string into Date object
            // in console, new Date().toISOString()
            date: new Date(args.availabilityInput.date)
        });
        let createdAvailableTime;
        try {
        const result = await availability
        .save()
            createdAvailableTime = transformAvailability(result);
            
            return createdAvailableTime;
        } catch (err) {
            console.log(err);
            throw err;
        }
       
        createdAvailability.push(createdAvailableTime);
        return createdAvailableTime;
    }
    
};
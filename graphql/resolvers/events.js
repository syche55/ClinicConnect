const Event = require('../../models/event');

const { transformEvent } = require('./merge');


module.exports = {
    events: async () => {
        try {
        const events = await Event.find();
        return events.map(event => {
                // access _doc, override _id(which is originally an object) to a string
                // same as event.id, see below
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
        
    },
    
    createEvent: async args => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            // parse string into Date object
            // in console, new Date().toISOString()
            date: new Date(args.eventInput.date),
            creator: '5fc737ac8778a929e71b7981'
        });
        let createdEvent;
        try {
        const result = await event
        .save()
            createdEvent = transformEvent(result);
            // substitute here
            const creator = await User.findById('5fc737ac8778a929e71b7981')
            if (!creator) {
                throw new Error('User not found.')
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        } catch (err) {
            console.log(err);
            throw err;
        }
       
        events.push(event);
        return event;
    }
    
};
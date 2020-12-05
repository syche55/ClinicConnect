const authResolver = require('./auth');
const availabilityResolver = require('./availability');
const bookingsResolver = require('./bookings');
const userResolver = require('./user');

const rootResolver = {
    ...authResolver,
    ...availabilityResolver,
    ...bookingsResolver,
    ...userResolver
};

module.exports = rootResolver;
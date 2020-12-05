const User = require('../../models/user');

module.exports = {
    user: async () => {
        try {
        const user = await User.find();
        return user
        } catch (err) {
            throw err;
        } 
    }
};
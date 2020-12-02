const bcrypt = require('bcryptjs');
const User = require('../../models/user');

module.exports = {
    createUser: async args => {
        try {
        // prevent duplicate
        const exsistingUser = await User.findOne({email: args.userInput.email})
            if (exsistingUser) {
                throw new Error('User exists already.')
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                const result = await user.save();
                // we do not want to expose password, even though hashed
                return { ...result._doc, password:null, _id: result.id }
            } catch (err) {
                throw err;
            }
    }
};
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');
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
                    password: hashedPassword,
                    firstName: args.userInput.firstName,
                    lastName: args.userInput.lastName,
                    isDoctor: args.userInput.isDoctor
                });
                const result = await user.save();
                // create token
                const token = jwt.sign({userId: user.id, email:user.email}, 'somekey', {
                    expiresIn: '1h'
                });
                // we do not want to expose password, even though hashed
                return { ...result._doc, password:null, _id: result.id, token: token }
            } catch (err) {
                throw err;
            }
    },
    login: async({email, password}) => {
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error('User does not exist!');
        }
        const isEqual =  await bcrypt.compare(password, user.password);
        if(!isEqual){
            throw new Error('Password is incorrect!');
        }
        // create token
        const token = jwt.sign({userId: user.id, email:user.email}, 'somekey', {
            expiresIn: '1h'
        });
        return {userId: user.id, isDoctor:user.isDoctor, token: token,  tokenExpiration: 1, firstName: user.firstName, lastName: user.lastName};
    }
};
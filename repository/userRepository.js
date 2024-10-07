const User = require('../models/user');

class UserRepository{
    async findUser(email){
        try{
             const existingUser = await User.findOne({ email });
             if (!existingUser){
                return false;
             }
             return existingUser;
        }
        catch (error) {
            throw error
        }
    }
}

module.exports = new UserRepository;
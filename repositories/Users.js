const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserRepository {
    async create(user) {
        try{
            let hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
            let newUser = await User.create(user);
            return newUser;
        } catch(err){
            throw(err);
        }
    }

    async findByUsername(username) {
        try {
            let user = await User.findOne({username: username});
            return user;
        } catch(err){
            throw(err);
        }
    }
    
    async addRefreshToken(userId, token) {
        try{
            await User.findByIdAndUpdate(userId, {$push: {refreshToken: token}})
        } catch(err){
            throw(err);
        }
    }

    async removeRefreshToken(userId, refreshToken) {
        try{
            await User.findByIdAndUpdate(userId, {$pull: {refreshToken: refreshToken}})
        } catch(err){
            throw(err);
        }
    }

    async findUserById(userId) {
        try {
            let user = await User.findById(userId);
            return user;
        } catch(err){
            throw(err);
        }
    }

    async checkRefresh(userId, refreshToken) {
        try {
            let user = await User.findById(userId);
            if(user.refreshToken.includes(refreshToken)) return true;
            else return false;
        } catch(err){
            throw(err);
        }
    }
}

module.exports = UserRepository
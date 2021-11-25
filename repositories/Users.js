const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');
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
            await User.findByIdAndUpdate(userId, {$push: {refreshToken: token}});
        } catch(err){
            throw(err);
        }
    }

    async removeRefreshToken(userId, refreshToken) {
        try{
            await User.findByIdAndUpdate(userId, {$pull: {refreshToken: refreshToken}});
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

    async findUserByPhone(phone) {
        try{
            let user = await User.findOne({phone: phone});
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

    async createFriendRequest(fromId, toId){
        try{
            let F_request = await FriendRequest.create({from: fromId, to: toId});
            let Friend_request = await FriendRequest.findById(F_request._id).populate({path: 'from', select: ['_id', 'name', 'avatar']}).populate({path: 'to', select: ['_id', 'name', 'avatar']});
            return Friend_request;
        } catch(err){
            throw(err);
        }
    }

    async removeFriendRequest(F_RequestId){
        try{
            await FriendRequest.findByIdAndRemove(F_RequestId);
        } catch(err){
            throw(err);
        }
    }

    async getFriendRequest(fromId, toId){
        try{
            let F_request = await FriendRequest.findOne({from: fromId, to: toId}).populate({path: 'from', select: ['_id', 'name', 'avatar', 'phone']}).populate({path: 'to', select: ['_id', 'name', 'avatar', 'phone']});
            return F_request;
        } catch(err){
            throw(err);
        }
    }

    async getFriendRequestById(frId) {
        try{
            const F_request = await FriendRequest.findById(frId);
            return F_request;
        } catch(err){
            throw(err);
        }
    }

    async getAllF_RequestTo(userId) {
        try{
            const F_Requests = await FriendRequest.find({to: userId}).populate({path: 'to', select: ['_id', 'name', 'avatar']}).populate({path: 'from', select: ['_id', 'name', 'avatar']}); 
            return F_Requests;
        } catch(err){
            throw(err);
        }
    }

    async addFriend(userId, friendId) {
        try{
            await User.findByIdAndUpdate(userId, {$push: {friends: friendId}});
        } catch(err){
            throw(err);
        }
    }

    async removeFriend(userId, friendId) {
        try{
            await User.findByIdAndUpdate(userId, {$pull: {friends: friendId}});
        } catch(err){
            throw(err);
        }
    }

    async getAllFriends(userId){
        try{
            const list_friend = await User.findById(userId).populate({path: 'friends', select: ['_id', 'name', 'avatar', 'phone']});
            return list_friend.friends;
        } catch(err) {
            throw(err);
        }
    }

    async changeAvatar(userId, avatarURL){
        try{
            await User.findByIdAndUpdate(userId, {avatar: avatarURL});
        } catch(err) {
            throw(err);
        }
    }

    async changeName(userId, name){
        try{
            await User.findByIdAndUpdate(userId, {name: name});
        } catch(err) {
            throw(err);
        }
    }

    async changePassword(userId, password){
        try{
            await User.findByIdAndUpdate(userId, {password: password});
        }catch(err){
            throw(err);
        }
    }

    async checkPassword(userId, pw){
        try{
            let hash = await bcrypt.hash(pw, 10);
            let password = await User.findById(userId).password;
            if(password == hash){
                return true;
            } else {
                return false;
            }
        } catch(err){
            throw(err);
        }
    }
}

module.exports = UserRepository
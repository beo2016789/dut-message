const util = require('util');
const nodemailer = require('nodemailer');
const mail = require('./mail');

class UserService {
    constructor(userRepo, requestRsPwRepo) {
        this._userRepo = userRepo;
        this._requestRsPwRepo = requestRsPwRepo;
    }

    async getUser(userId) {
        try {
            let user = await this._userRepo.findUserById(userId);
            if(user) return user;
            else throw({error: 'user not found'}); 
        } catch (err) {
            throw(err);
        }
    }

    async findByUsername(username) {
        try{
            const user = this._userRepo.findByUsername(username);
            return user;
        } catch (err) {
            throw(err);
        }
    }

    async findUserByPhone(phone) {
        try{
            const user = this._userRepo.findUserByPhone(phone);
            return user;
        } catch (err) {
            throw(err);
        }
    }

    async findUserByEmail(email) {
        try{
            const user = this._userRepo.findUserByEmail(email);
            return user;
        } catch (err) {
            throw(err);
        }
    }

    async createFriendRequest(fromId, toId){
        try{
            const F_requests = await this._userRepo.createFriendRequest(fromId, toId);
            return F_requests;
        } catch (err) {
            throw(err);
        }
    }

    async removeFriendRequest(F_requestId) {
        try{
            await this._userRepo.removeFriendRequest(F_requestId);
        } catch (err) {
            throw(err);
        }
    }

    async getAllF_RequestTo(userId) {
        try{
            const F_requests = await this._userRepo.getAllF_RequestTo(userId);
            return F_requests;
        } catch (err) {
            throw(err);
        }
    }

    async getFriendRequest(fromId, toId) {
        try{
            const F_request = await this._userRepo.getFriendRequest(fromId, toId);
            return F_request;
        } catch (err) {
            throw(err);
        }
    }

    async getFriendRequestById(frId) {
        try {
            const F_request = await this._userRepo.getFriendRequestById(frId);
            return F_request;
        } catch (err) {
            throw(err);
        }
    }

    async addFriend(userId, friendId) {
        try{
            await this._userRepo.addFriend(userId, friendId);
            await this._userRepo.addFriend(friendId, userId);
        } catch (err) {
            throw(err);
        }
    }

    async removeFriend(userId, friendId) {
        try{
            await this._userRepo.removeFriend(userId, friendId);
            await this._userRepo.removeFriend(friendId, userId);
        } catch (err) {
            throw(err);
        }
    }

    async getAllFriends(userId) {
        try{
            const friends = await this._userRepo.getAllFriends(userId);
            return friends;
        } catch (err) { 
            throw(err);
        }
    }

    async checkFriend(userId, friendId){
        try{
            const user = await this._userRepo.findUserById(userId);
            if(user.friends.includes(friendId)){
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw(err);
        }
    }

    async updateInfoUser(userId, name, email, avatar){
        try {
            await this._userRepo.updateInfoUser(userId, {name: name, email: email, avatar: avatar});
        } catch (err) {
            throw(err);
        }
    }

    async changePassword(userId, inputPassword) {
        try{
            const checkCurrentPassword = await this._userRepo.checkPassword(userId, inputPassword.current);
            if(checkCurrentPassword) {
                await this._userRepo.changePassword(userId, inputPassword.new);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw(err);
        }
    }

    async sendEmailResetPassword(userId, email) {
        try{
            const request = await this._requestRsPwRepo.createRequest(userId, email);
            setTimeout(this._requestRsPwRepo.deleteRequest, 180000, request._id);
            let content = mail(request._id);
            let transporter =  nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                },
                tls: {
                    rejectUnauthorized: false,
                }
            })

            let mailOptions = {
                from: 'quocdatdn292001@gmail.com',
                to: email,
                subject: 'DUT-Message',
                html: content
            }

            await transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('Message sent: ' + info.response)
                }
            })
            return request;
        } catch (err) {
            throw(err);
        }
    }

    

    async resetPassword(requestId, password){
        try {
            const request = await this._requestRsPwRepo.findRequest(requestId);
            if(request) {
                await this._userRepo.changePassword(request.userId._id, password);
                await this._requestRsPwRepo.deleteRequest(requestId);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw(err);
        }
    }
}

module.exports = UserService;
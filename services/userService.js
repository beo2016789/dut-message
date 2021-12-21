const Vonage = require('@vonage/server-sdk');
const vonage = new Vonage({
    apiKey: "105acf09",
    apiSecret: "UwSnPupKWzd9ylnJ"
});


class UserService {
    constructor(userRepo) {
        this._userRepo = userRepo;
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

    async sendOTP(phoneNumber) {
        try{
            await vonage.verify.request({
                number: `${phoneNumber}`,
                brand: "Dut-Message"
            }, (err, result) => {
                if(err) {
                    console.log(err);
                    throw(err);
                } else {
                    const verifyRequestId = result.request_id;
                    console.log(verifyRequestId);
                    return verifyRequestId;
                }
            })
        } catch (err) {
            throw(err);
        }
    }

    async verifyOTP(requestId, codeOTP) {
        try{
            await vonage.verify.check({
                request_id: requestId,
                code: codeOTP
            }, async (err, result) => {
                if(err) {
                    throw(err);
                } else {
                    console.log(result);
                    return result;
                }
            })
        } catch (err) {
            throw(err);
        }
    }

    async resetPassword(phoneNumber, newPassword){
        try {
            const user = await this._userRepo.findUserByPhone(phoneNumber);
            if(user) {
                await this._userRepo.changePassword(user._id, newPassword);
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
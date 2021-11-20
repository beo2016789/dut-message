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

}

module.exports = UserService;
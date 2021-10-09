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
}

module.exports = UserService;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class AuthService {
    constructor(userRepo) {
        this._userRepo = userRepo;
    }

    async login(username, password) {
        try {
            let user = await this._userRepo.findByUsername(username);
            if(user != undefined) {
                let isValid = await bcrypt.compare(password, user.password);
                if(!isValid) {
                    throw("Password incorrect.");
                } else {
                    const accessToken = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "60"});
                    const refreshToken = jwt.sign({id: user._id}, process.env.SECRET_REFRESH_TOKEN);
                    this._userRepo.addRefreshToken(user._id, refreshToken);
                    return {
                        user: user,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    };
                }
            } else {
                throw("user not found");
            }
        } catch(err) {
            throw(err);
        }
    }
    async signup(user){
        try {
            let newUser = await this._userRepo.create(user);
            return newUser;
        } catch (err) {
            throw(err);
        }
    }
    async logout(userId, refreshToken){
        try{
            console.log(userId);
            console.log(refreshToken);
            this._userRepo.removeRefreshToken(userId, refreshToken);
        } catch (err) {
            throw(err);
        }
    }
}

module.exports = AuthService;
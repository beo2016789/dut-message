const jwt = require('jsonwebtoken');

class Auth {
    constructor(userRepo) {
        this._userRepo = userRepo;
    }
    AuthenToken = async (req, res, next) => {
        try {
            const accessToken = req.headers.accesstoken;
            if(!accessToken) res.status(401).json({error: "Invalid Request"});
            const decoded = await jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
            res.accessToken = accessToken;
            next();
        } catch (err) {
            if(err.name === "TokenExpiredError") {
                const refreshToken = await req.headers.refreshtoken;
                if(!refreshToken) return res.status(401).json({error: "Invalid Request"});
                await jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, async (err, token) => {
                    if(err) return res.status(401).json({error: "Invalid Request"});
                    else {
                        const checkRefreshToken = await this._userRepo.checkRefresh(req.headers.id, refreshToken);
                        if(!checkRefreshToken) return res.status(401).json({error: "Invalid Request"});
                        const newAccessToken = jwt.sign({id: req.headers.id}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: "60"});
                        res.accessToken = newAccessToken;
                        next();
                    }
                }); 
            }
            else return res.status(401).json({error: "Invalid Request"});
        }
    }
}

module.exports = Auth;
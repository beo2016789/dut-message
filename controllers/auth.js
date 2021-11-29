class AuthController {
    constructor(authService) {
        this._authService = authService;
    }
    login = async (req, res, next) => {
        try {
            let response = await this._authService.login(req.body.username, req.body.password);
            res.status(200).json(response);
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    signup =  async (req, res, next) => {
        try {
            let check = false;
            let user = {
                ...req.body
            }
            let validate = {
                "usernameExist": false,
                "phoneExist": false
            }
            let checkUsername = await this._authService.checkUsernameExist(user.username);
            if(checkUsername){
                validate.usernameExist = true;
                check = true;
            }
            let checkPhone = await this._authService.checkPhoneExist(user.phone)
            if(checkPhone){
                validate.phoneExist = true;
                check = true;
            }
            if(check) {
                res.status(400).json({"validate": validate})
            } else {
                let newUser = await this._authService.signup(user);
                res.status(201).json(newUser);
            }
        } catch (err) {
            res.status(500).json({error: err});
        }
    }
    logout = async (req, res, next) => {
        try {
            const refreshToken = req.headers.refreshtoken;
            await this._authService.logout(req.body.id, refreshToken);
            res.status(200).json('Logout success');
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    checkUsernameExist = async (req, res, next) => {
        try{
            const checkExist = await this._authService.checkUsernameExist(req.body.username);
            res.status(200).json({"Exist": checkExist});
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    checkPhoneExist = async (req, res, next) => {
        try{
            const checkExist = await this._authService.checkPhoneExist(req.body.phone);
            res.status(200).json({"Exist": checkExist});
        } catch (err) {
            res.status(500).json({error: err});
        }
    }
}

module.exports = AuthController;
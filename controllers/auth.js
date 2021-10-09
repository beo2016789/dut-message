class AuthController {
    constructor(authService) {
        this._authService = authService;
    }
    login = async (req, res, next) => {
        try {
            let response = await this._authService.login(req.body.username, req.body.password);
            res.status(200).json(response);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    signup =  async (req, res, next) => {
        try {
            let user = {
                ...req.body
            }
            let newUser = await this._authService.signup(user);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    logout = async (req, res, next) => {
        try {
            const refreshToken = req.headers.refreshtoken;
            await this._authService.logout(req.body.id, refreshToken);
            res.status(200).json('Logout success');
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = AuthController;
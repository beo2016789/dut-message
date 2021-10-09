class UserController {
    constructor(userService) {
        this._userService = userService;
    }

    getUser = async (req, res, next) =>  {
        try {
            let response = await this._userService.getUser(req.headers.id);
            res.status(201).json(response);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = UserController;
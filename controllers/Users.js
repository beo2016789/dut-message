class UserController {
    constructor(userService) {
        this._userService = userService;
    }

    getUser = async (req, res, next) =>  {
        try {
            let response = await this._userService.getUser(req.headers.id);
            res.status(201).json(response);
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    findByUsername = async (req, res, next) => {
        try{
            let response = await this._userService.findByUsername(req.body.username);
            res.status(200).json(response);
        } catch (err) {
            res.status(500).json({error: err});
        }

    }

    findUserByPhone = async (req, res, next) => {
        try{
            let response = await this._userService.findUserByPhone(req.body.phone);
            res.status(200).json(response);
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    getAllF_RequestTo = async (req, res, next) => {
        try{
            let list_request = await this._userService.getAllF_RequestTo(req.headers.id);
            res.status(200).json(list_request);
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    createF_request = async (req, res, next) => {
        try{
            const F_request = await this._userService.createFriendRequest(req.headers.id, req.body.toId);
            res.status(200).json(F_request);
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    addFriend = async (req, res, next) => {
        try{
            await this._userService.addFriend(req.headers.id, req.body.toId);
            await this._userService.addFriend(req.body.toId, req.headers.id);
            res.status(200).json({success: 'success'});
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    getAllFriend = async (req, res, next) => {
        try{
            const list_friend = this._userService.getAllFriends(req.headers.id);
            res.status(200).json(list_friend);
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    
}

module.exports = UserController;
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
            if(response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({error: "not found"});
            }
        } catch (err) {
            res.status(500).json({error: err});
        }

    }

    findUserByPhone = async (req, res, next) => {
        try{
            let response = await this._userService.findUserByPhone(req.body.phone);
            if(response){
                res.status(200).json(response);
            } else {
                res.status(404).json({error: "not found"});
            }
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

    checkFriend = async (req, res, next) => {
        try{
            const check = await this._userService.checkFriend(req.headers.id, req.body.friendId);
            res.status(200).json({"isFriend": check});
        } catch (err) {
            res.status(500).json({error: err})
        }
    }

    checkFriendRequest = async (req, res, next) => {
        try{
            const F_requestFromId = await this._userService.getFriendRequest(req.headers.id, req.body.toId);
            if(F_requestFromId){
                res.status(200).json({"friend-request": "send"});
            } else {
                const F_requestToId = await this._userService.getFriendRequest(req.body.toId, req.headers.id);
                if(F_requestToId){
                    res.status(200).json({"friend-request": "receive"});
                } else {
                    res.status(200).json({"friend-request": "no-interact"});
                }
            }
        } catch (err) {
            res.status(500).json({error: err})
        }
    }
}

module.exports = UserController;
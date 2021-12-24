

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
            const list_friend = await this._userService.getAllFriends(req.headers.id);
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
            const check = await this._userService.checkFriend(req.headers.id, req.body.toId);
            if(check) {
                res.status(200).json({"message": "is friend"});
            } else {
                const F_requestFromId = await this._userService.getFriendRequest(req.headers.id, req.body.toId);
                if(F_requestFromId){
                    res.status(200).json({"message": "have send add friend request"});
                } else {
                    const F_requestToId = await this._userService.getFriendRequest(req.body.toId, req.headers.id);
                    if(F_requestToId){
                        res.status(200).json({"message": "have receive add friend request"});
                    } else {
                        res.status(200).json({"message": "no add friend request"});
                    }
                }
            }
        } catch (err) {
            res.status(500).json({error: err})
        }
    }

    updateInfoUser = async (req, res, next) => {
        try {
            await this._userService.updateInfoUser(req.headers.id, req.body.name, req.body.email, req.body.avatar);
            res.status(200).json({success: 'success'});
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    changePassword = async (req, res, next) => {
        try{
            const checkResetPassword = await this._userService.changePassword(
                req.headers.id,
                {
                    current: req.body.currentPassword,
                    new: req.body.newPassword
                }
            )
            if(checkResetPassword) {
                res.status(200).json({success: checkResetPassword});
            } else {
                res.status(301).json({success: checkResetPassword});
            }
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    forgotPassword = async (req, res, next) => {
        try{
            const email = req.body.email;
            const user  = await this._userService.findUserByEmail(email);
            if(user) {
                const requestRsPW = await this._userService.sendEmailResetPassword(user._id, email);
                res.status(200).json({request: requestRsPW});
            } else {
                res.status(401).json({error: "user not found"})
            }
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    forwardToFormResetPw = async (req, res, next) => {
        const requestId = req.params.request_rs_pw_id;
        res.render('resetPassword', {requestId: requestId});
    }

    resetPassword = async (req, res, next) => {
        try{
            const password = req.body.password;
            const requestId = req.params.requestId;
            const check = await this._userService.resetPassword(requestId, password)
            res.render('notifyResetPw', {success: check})
        } catch (err) {
            res.status(500).json({error: err})
        }
    }
}

module.exports = UserController;
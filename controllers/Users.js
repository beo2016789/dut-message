

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
            await this._userService.updateInfoUser(req.headers.id, req.body.name, req.body.email);
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
            const phoneNumber = req.body.phone_number;
            const user  = await this._userService.findUserByPhone(phoneNumber);
            if(user) {
                const requestId = await this._userService.sendOTP(phoneNumber);
                if(requestId){
                    res.status(200).json({phone: phoneNumber, request_id: requestId});
                } else {
                    res.status(401).json({error: "don't get requestId"});
                }
            } else {
                res.status(401).json({error: "user not found"})
            }
        } catch (err) {
            res.status(500).json({error: err});
        }
    }

    verifyOTP = async (req, res, next) => {
        try{
            const result = await this._userService.verifyOTP(req.body.request_id, req.body.codeOTP);
            if(result) {
                res.status(200).json({"verify-otp": true, "phone": req.body.phone_number});
            } else {
                res.status(401).json({"verify-otp": false});

            }
        } catch (err) {
            res.status(500).json({error: err})
        }
    }

    resetPassword = async (req, res, next) => {
        try{
            const check = await this._userService.resetPassword(req.body.phone_number, req.body.new_password)
            if(check) {
                res.status(200).json({'success': true});
            } else {
                res.status(401).json({'success': false});
            }
        } catch (err) {
            res.status(500).json({error: err})
        }
    }
}

module.exports = UserController;
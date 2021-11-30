const express = require('express');
const {userController, authController} = require('../utility/modulesInjection')
const router = express.Router();

const {authMiddleware} = require('../utility/modulesInjection')
router.post('/checkFriend', userController.checkFriend);
router.post('/checkFriendRequest', userController.checkFriendRequest);

router.use(authMiddleware.AuthenToken);

router.get('/friends', userController.getAllFriend);
router.post('/logout', authController.logout);
router.post('/find-by-phone', userController.findUserByPhone);
router.post('/update-info', userController.updateInfoUser);
router.patch('/change-password', userController.resetPassword);
router.get('friend-request', userController.getAllF_RequestTo);
// router.post('/add-friend', userController.addFriend);
// router.post('/create-friend-request', userController.createF_request);
router.get('/', userController.getUser);

module.exports = router;
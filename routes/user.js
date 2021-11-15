const express = require('express');
const {userController, authController} = require('../utility/modulesInjection')
const router = express.Router();

const {authMiddleware} = require('../utility/modulesInjection')
router.use(authMiddleware.AuthenToken);

router.post('/logout', authController.logout);
router.get('/find-by-phone', userController.findUserByPhone);
router.get('friend-request', userController.getAllF_RequestTo);
router.get('/friends', userController.getAllFriend);
// router.post('/create-friend-request', userController.createF_request);
// router.post('/add-friend', userController.addFriend);
router.get('/', userController.getUser);

module.exports = router;
const express = require('express');
const {userController, authController} = require('../utility/modulesInjection')
const router = express.Router();

const {authMiddleware} = require('../utility/modulesInjection')
router.use(authMiddleware.AuthenToken);

router.post('/logout', authController.logout);
router.get('/', userController.getUser);

module.exports = router;
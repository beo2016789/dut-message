const express = require('express');
const {authController} = require('../utility/modulesInjection')
const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/checkUsernameExist', authController.checkUsernameExist);
router.get('/checkPhoneExist', authController.checkPhoneExist);

module.exports = router;
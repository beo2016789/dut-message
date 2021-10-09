const express = require('express');
const {conversationController} = require('../utility/modulesInjection');
const router = express.Router();

router.post('/create', conversationController.createConversation);

module.exports = router;
const express = require('express');
const {conversationController} = require('../utility/modulesInjection');
const router = express.Router();

const {authMiddleware} = require('../utility/modulesInjection')
router.use(authMiddleware.AuthenToken);

router.get('/messages/:converId', conversationController.getMessageByConverId)
router.get('/:converId', conversationController.getConverById)
router.get('/', conversationController.getAllConverByUserId);

module.exports = router;
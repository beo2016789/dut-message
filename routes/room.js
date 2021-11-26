const express = require('express');
const {roomController} = require('../utility/modulesInjection');
const router = express.Router();

const {authMiddleware} = require('../utility/modulesInjection')
router.use(authMiddleware.AuthenToken);

router.get('/messages', roomController.getMessageByRoomId);
router.get('/', roomController.getAllRoomByUserId);
router.post('/create', roomController.createRoom);

router.get('/roomIds', roomController.getAllRoomIdsByUserId);

module.exports = router;
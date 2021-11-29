const express = require('express');
const {roomController} = require('../utility/modulesInjection');
const router = express.Router();

const {authMiddleware} = require('../utility/modulesInjection')
// router.use(authMiddleware.AuthenToken);

router.get('/messages', roomController.getMessageByRoomId);
router.get('/:roomId', roomController.getRoomById);
router.get('/', roomController.getAllRoomByUserId);
router.get('/roomIds', roomController.getAllRoomIdsByUserId);
router.post('/create', roomController.createRoom);
router.patch('/addUserfromRoom', roomController.addUserfromRoom);
router.patch('/removeUserfromRoom', roomController.removeUserfromRoom);


module.exports = router;
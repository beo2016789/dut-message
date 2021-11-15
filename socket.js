const SocketController = require('./socketUtils/socket_controller');
const SocketRepo = require('./socketUtils/socket_repo');
const SocketConsts = require('./socketUtils/socket_consts');
const {userService, roomService, messageService} = require('./utility/modulesInjection');

let socketRepo = new SocketRepo();
let socketController = new SocketController(userService, messageService, socketRepo);
module.exports = (socket, io) => {
    const userId = socket.handshake.query.userId;
    socketRepo.addUserToMap(userId, socket.id);
    const list_roomId = roomService.getListRoomIdsByUserId(userId);
    list_roomId.map((id) => {
        socket.join(`${id}`);
    })
    onConverMessage(socket, io);
    onRoomMessage(socket);
    onFriendRequest(socket, io);
    onAddFriend(socket, io);
    onDisconnect(socket);
    
    
}

function onConverMessage(socket, io) {
    socket.on(SocketConsts.EVENT_SEND_CONVER_MESSAGE, (data) => {
        socketController.converMessageHandler(socket, io, data);
    })
}

function onRoomMessage(socket) {
    socket.on(SocketConsts.EVENT_SEND_ROOM_MESSAGE, (data) => {
        socketController.roomMessageHandler(socket, data);
    })
}

function onFriendRequest(socket, io) {
    socket.on(SocketConsts.EVENT_SEND_FRIEND_REQUEST, (data) => {
        socketController.friendRequestHandler(socket, io, data);
    })
}

function onAddFriend(socket, io) {
    socket.on(SocketConsts.EVENT_ACCEPT_FRIEND_REQUEST, (data) => {
        socketController.addFriendHandler(socket, io, data);
    })
}

function onDisconnect(socket) {
    socket.on(SocketConsts.ON_DISCONNECT, () => {
        socketController.disconnectHandler(socket);
    })
}
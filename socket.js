const SocketController = require('./socketUtils/socket_controller');
const SocketRepo = require('./socketUtils/socket_repo');
const SocketConsts = require('./socketUtils/socket_consts');
const {userService, roomService, messageService} = require('./utility/modulesInjection');

let socketRepo = new SocketRepo();
let socketController = new SocketController(userService, messageService, socketRepo);
module.exports = async (socket, io) => {
    const userId = socket.handshake.query.userId;
    console.log(userId)
    socketRepo.addUserToMap(userId, socket.id);
    const list_roomId = await roomService.getListRoomIdsByUserId(userId);
    list_roomId.map((id) => {
        console.log(id._id);
        socket.join(`${id._id}`);
    })
    console.log(socket.rooms);
    onConverMessage(socket, io);
    onRoomMessage(socket);
    onFriendRequest(socket, io);
    onAddFriend(socket, io);
    onDisconnect(socket);
    onCancelFriendRequest(socket, io);
    onDelFriend(socket, io);
    onJoinRoom(socket, io);
    onLeaveRoom(socket, io);
    onCreateRoom(socket, io);
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

function onDelFriend(socket, io){
    socket.on(SocketConsts.EVENT_SEND_CANCEL_FRIEND, (data) => {
        socketController.removeFriendHandler(socket, io, data);
    })
}

function onCancelFriendRequest(socket, io) {
    socket.on(SocketConsts.EVENT_CANCEL_FRIEND_REQUEST, (data) => {
        socketController.removeFriendRequest(socket, io, data);
    })
}

function onCreateRoom(socket, io) {
    socket.on(SocketConsts.EVENT_SEND_CREATE_ROOM, (data) => {
        socketController.createRommHandler(socket, io, data);
    })
}

function onJoinRoom(socket, io) {
    socket.on(SocketConsts.EVENT_SEND_JOIN_ROOM, (data) => {
        socketController.joinRoomHandler(socket, io, data);
    })
}

function onLeaveRoom(socket, io) {
    socket.on(SocketConsts.EVENT_SEND_LEAVE_ROOM, (data) => {
        socketController.leaveRoomHandler(socket, io, data);
    })
}

function onDisconnect(socket) {
    socket.on(SocketConsts.ON_DISCONNECT, () => {
        socketController.disconnectHandler(socket);
    })
}
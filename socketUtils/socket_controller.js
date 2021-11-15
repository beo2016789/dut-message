const { isObject } = require('util');
const socketConsts = require('./socket_consts');

class SocketController {
    constructor(userService, messageService, socketRepo){
        this._userService = userService;
        this._messageService = messageService;
        this._socketRepo = socketRepo;
    }

    async converMessageHandler(socket, io, data) {
        const result = await this._messageService.addMessageToConver(data.toUserId, {author: data.fromUserId, content: data.content});
        io.to(`${this._socketRepo.getSocketIdByUserId(data.toUserId)}`).emit(socketConsts.EVENT_RECEIVE_CONVER_MESSAGE, result);
    }

    async roomMessageHandler(socket, data) {
        const result = await this._messageService.addMessageToRoom(data.roomId, {author: data.fromUserId, content: data.content});
        socket.to(`${data.roomId}`).emit(socketConsts.EVENT_RECEIVE_ROOM_MESSAGE, result);
    }

    async friendRequestHandler(socket, io, data) {
        const F_request = this._userService.createFriendRequest(data.fromId, data.toId);
        io.to(`${this._socketRepo.getSocketIdByUserId(data.toId)}`).emit(socketConsts.EVENT_RECEIVE_FRIEND_REQUEST, F_request);
    }

    async addFriendHandler(socket, io, data) {
        await this._userService.addFriend(data.fromId, data.toId);
        await this._userService.addFriend(data.toId, data.fromId);
        io.to(`${this._socketRepo.getSocketIdByUserId(data.fromId)}`).emit(socketConsts.EVENT_NOTIFY_ACCEPT_FRIEND, 'is accepted');
        io.to(`${this._socketRepo.getSocketIdByUserId(data.toId)}`).emit(socketConsts.EVENT_NOTIFY_ACCEPT_FRIEND, 'accepted');
    }

    async disconnectHandler(socket) {
        
    }
}

module.exports = SocketController;

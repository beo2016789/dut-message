const { isObject } = require('util');
const socketConsts = require('./socket_consts');

class SocketController {
    constructor(userService, messageService, socketRepo){
        this._userService = userService;
        this._messageService = messageService;
        this._socketRepo = socketRepo;
    }

    async converMessageHandler(socket, io, data) {
        let message = await this._messageService.addMessageToConver(data.toUserId, {author: data.fromUserId, content: data.content});
        let result = {
            ...message,
        }
        io.to(`${this._socketRepo.getSocketIdByUserId(data.toUserId)}`).emit(socketConsts.EVENT_RECEIVE_CONVER_MESSAGE, result);
    }

    async  roomMessageHandler(socket, data) {
        const result = await this._messageService.addMessageToRoom(data.roomId, {author: data.fromUserId, content: data.content});
        socket.to(data.roomId).emit(socketConsts.EVENT_RECEIVE_ROOM_MESSAGE, result);
    }

    async friendRequestHandler(socket, io, data) {
        const F_request = await this._userService.createFriendRequest(data.fromId, data.toId);
        io.to(`${this._socketRepo.getSocketIdByUserId(data.toId)}`).emit(socketConsts.EVENT_RECEIVE_FRIEND_REQUEST, F_request);
    }

    async addFriendHandler(socket, io, data) {
        await this._userService.addFriend(data.fromId, data.toId);
        const F_request = await this._userService.getFriendRequest(data.fromId, data.toId);
        await this._userService.removeFriendRequest(F_request._id);
        io.to(`${this._socketRepo.getSocketIdByUserId(data.fromId)}`).emit(socketConsts.EVENT_NOTIFY_ACCEPT_FRIEND, F_request.to);
        io.to(`${this._socketRepo.getSocketIdByUserId(data.toId)}`).emit(socketConsts.EVENT_NOTIFY_ACCEPT_FRIEND, F_request.from);
    }

    async removeFriendRequest(socket, io, data) {
        const F_request = await this._userService.getFriendRequestById(data.friend_request_id);
        await this._userService.removeFriendRequest(data.friend_request_id);
        if(data.fromId == F_request.from){
            io.to(`${this._socketRepo.getSocketIdByUserId(data.toId)}`).emit(socketConsts.EVENT_REMOVE_FRIEND_REQUEST, F_request)
        }
    }

    async removeFriendHandler(socket, io, data) {

    }

    async disconnectHandler(socket) {
        
    }
}

module.exports = SocketController;

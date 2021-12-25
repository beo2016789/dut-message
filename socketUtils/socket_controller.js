const { isObject } = require('util');
const socketConsts = require('./socket_consts');

class SocketController {
    constructor(userService, messageService, socketRepo){
        this._userService = userService;
        this._messageService = messageService;
        this._socketRepo = socketRepo;
    }

    async converMessageHandler(socket, io, data) {
        let message;
        if(data.isImg){
            message = await this._messageService.addMessageToConver(data.converId, {author: data.fromUserId, content: data.content, isImg: true});
        } else {
            message = await this._messageService.addMessageToConver(data.converId, {author: data.fromUserId, content: data.content});
        }
        let result = {
            converId: data.converId,
            message: message,
        }
        io.to(`${this._socketRepo.getSocketIdByUserId(data.toUserId)}`).to(`${this._socketRepo.getSocketIdByUserId(data.fromUserId)}`).emit(socketConsts.EVENT_RECEIVE_CONVER_MESSAGE, result);
    }

    async  roomMessageHandler(socket, io, data) {
        let message;
        if(data.isImg){
            message = await this._messageService.addMessageToRoom(data.roomId, {author: data.fromUserId, content: data.content, isImg: true});
        } else {
            message = await this._messageService.addMessageToRoom(data.roomId, {author: data.fromUserId, content: data.content});
        }
        let result = {
            roomId: data.roomId,
            message: message,
        }
        io.to(data.roomId).emit(socketConsts.EVENT_RECEIVE_ROOM_MESSAGE, result);
    }

    async friendRequestHandler(socket, io, data) {
        const F_request = await this._userService.createFriendRequest(data.fromId, data.toId);
        io.to(`${this._socketRepo.getSocketIdByUserId(data.toId)}`).emit(socketConsts.EVENT_RECEIVE_FRIEND_REQUEST, F_request);
    }

    async addFriendHandler(socket, io, data) {
        await this._userService.addFriend(data.fromId, data.toId);
        const F_request = await this._userService.getFriendRequest(data.fromId, data.toId);
        const existConver = await this._messageService.checkExistConver([data.fromId, data.toId]);
        let conver;
        if(existConver) {
            conver = existConver;
        } else {
            conver = await this._messageService.createConversation([data.fromId, data.toId]);
        }
        await this._userService.removeFriendRequest(F_request._id);
        io.to(`${this._socketRepo.getSocketIdByUserId(data.fromId)}`).emit(socketConsts.EVENT_NOTIFY_ACCEPT_FRIEND, {'infoFriend': F_request.to, 'conver': conver});
        io.to(`${this._socketRepo.getSocketIdByUserId(data.toId)}`).emit(socketConsts.EVENT_NOTIFY_ACCEPT_FRIEND, {'infoFriend': F_request.from, 'conver': conver});
    }

    async removeFriendRequest(socket, io, data) {
        const F_request = await this._userService.getFriendRequestById(data.friend_request_id);
        await this._userService.removeFriendRequest(data.friend_request_id);
        if(data.fromId == F_request.from){
            io.to(`${this._socketRepo.getSocketIdByUserId(data.toId)}`).emit(socketConsts.EVENT_REMOVE_FRIEND_REQUEST, F_request)
        }
    }

    async removeFriendHandler(socket, io, data) {
        await this._userService.removeFriend(data.fromId, data.toId);
        io.to(`${this._socketRepo.getSocketIdByUserId(data.fromId)}`).emit(socketConsts.EVENT_RECEIVE_CANCEL_FRIEND, data.toId);
        io.to(`${this._socketRepo.getSocketIdByUserId(data.toId)}`).emit(socketConsts.EVENT_RECEIVE_CANCEL_FRIEND, data.fromId);
    }

    async createRoomHandler(socket, io, data) {
        if(data.nameRoom == undefined || data.nameRoom == "") {
            data.nameRoom = "Nhóm của bạn và " + data.ids.length + " người khác";
        }
        const arrayId = [data.authorId].concat(data.ids)
        const room = await this._messageService.createRoom(arrayId, data.nameAuthor, data.nameRoom);
        arrayId.map((id) => {
            io.to(`${this._socketRepo.getSocketIdByUserId(id)}`).emit(socketConsts.EVENT_RECEIVE_CREATE_ROOM, room);
        })
    }

    async joinRoomHandler(socket, io, data) {
        const room = await this._messageService.getRoomByIdHaveListMessage(data.roomId);
        socket.join(`${data.roomId}`);
        io.to(`${this._socketRepo.getSocketIdByUserId(data.fromId)}`).emit(socketConsts.EVENT_RECEIVE_JOIN_ROOM, room);
    }

    async addUserToRoom(socket, io, data) {
        const list_message = await this._messageService.addUserToRoom(data.roomId, data.user_add_id, data.array_user_is_added_id);
        list_message.map(message => {
            let result = {
                roomId: data.roomId,
                message: message
            }
            io.to(data.roomId).emit(socketConsts.EVENT_RECEIVE_ROOM_MESSAGE, result);
        })
        const room = await this._messageService.getRoomByIdHaveListMessage(data.roomId);
        data.array_user_is_added_id.map(id => {
            io.to(`${this._socketRepo.getSocketIdByUserId(id)}`).emit(socketConsts.EVENT_RECEIVE_ADD_USER_TO_ROOM, room);
        })
    }

    async leaveRoomHandler(socket, io, data) {
        const message = await this._messageService.removeUserfromRoom(data.roomId, data.fromId);
        let result = {
            roomId: data.roomId,
            message: message,
        }
        socket.leave(data.roomId);
        io.to(data.roomId).emit(socketConsts.EVENT_RECEIVE_ROOM_MESSAGE, result);
    }

    async removeConverMessageHandler(socket, io, data) {
        await this._messageService.removeMessage(data.messageId);
        io.to(`${this._socketRepo.getSocketIdByUserId(data.toId)}`).emit(socketConsts.EVENT_RECEIVE_REMOVE_CONVER_MESSAGE, {converId: data.converId, messageId: data.messageId});
        io.to(`${this._socketRepo.getSocketIdByUserId(data.fromId)}`).emit(socketConsts.EVENT_RECEIVE_REMOVE_CONVER_MESSAGE, {converId: data.converId, messageId: data.messageId});
    }

    async removeRoomMesssageHandler(socket, io, data) {
        await this._messageService.removeMessage(data.messageId);
        io.to(data.roomId).emit(socketConsts.EVENT_RECEIVE_REMOVE_ROOM_MESSAGE, {roomId: data.roomId, messageId: data.messageId});
        
    }

    async disconnectHandler(socket, io) {
        console.log("Disconnect: " + socket.id)
        this._socketRepo.removeUserBySocketId(socket.id);
    }
}

module.exports = SocketController;

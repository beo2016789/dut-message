const Room = require('../models/Room');
class RoomRepository {
    async createRoom(arrayMember, nameRoom){
        try {
            let memberArray = [];
            arrayMember.map((member) => {
                memberArray.push({member: member.id, nick_name: member.nick_name});
            })
            const room = await Room.create({name: nameRoom, members: memberArray, avatar: "https://cdn4.vectorstock.com/i/1000x1000/22/08/people-having-conversation-icon-image-vector-14222208.jpg"});
            const result = await Room.findById(room._id, ['_id', 'name', 'members']).populate({path: 'members.member', select: ['_id', 'name', 'avatar', 'phone']});
            return result;
        } catch (error) {
            throw(error);
        }
    }

    async updateSeen(roomId, memberId) {
        try {
            await Room.updateOne({_id: roomId, 'members.member' : memberId}, {$set: {'members.$.last_seen': Date.now()}});
        } catch (error) {
            throw(error);
        }
    }

    async addMessage(roomId, messageId) {
        try {
            await Room.findByIdAndUpdate(roomId, {$push: {list_message: messageId}});
        } catch (error) {
            throw(error);
        }
    }

    async removeMessage(roomId, messageId) {
        try {
            await Room.findByIdAndUpdate(roomId, {$pull: {list_message: messageId}});
        } catch (error) {
            throw(error);
        }
    }

    async getMessageByRoomId(roomId) {
        try{
            const room = await Room.findById(roomId).populate({path: 'list_message', populate: {path: 'author', select: ['_id', 'name', 'avatar', 'phone']}});
            return room.list_message;
        } catch (error) {
            throw(error);
        }
    }

    async getAllRoomByUserId(userId){
        try{ 
            const list_room = await Room.find({
                members: {$elemMatch: {member: userId}}
            }).populate({
                path: 'members.member', 
                select: ['_id', 'name', 'avatar']
            }).populate({
                path: 'list_message', 
                // options: {
                //     limit: 1, 
                //     sort: {$natural: -1}
                // }, 
                populate: {
                    path: 'author', 
                    select: ['_id', 'name', 'avatar', 'phone']
                }
            });
            return list_room;
        } catch (error) {
            throw(error);
        }
    }

    async getListRoomIdsByUserId(userId) {
        try{ 
            const list_roomId = await Room.find({members: {$elemMatch: {member: userId}}}, '_id');  
            return list_roomId;
        } catch (error) {
            throw(error);
        }
    }

    async getRoomById(roomId) {
        try{ 
            const room = await Room.findById(roomId, ['_id', 'name', 'members']).populate({path: 'members.member', select: ['_id', 'name', 'avatar', 'phone']});
            return room;
        } catch (error) {
            throw(error);
        }
    }

    async getRoomByIdHaveListMessage(roomId) {
        try{ 
            const room = await Room.findById(roomId).populate({path: 'members.member', select: ['_id', 'name', 'avatar', 'phone']}).populate({path: 'list_message', populate: {path: 'author', select: ['_id', 'name', 'avatar', 'phone']}});
            return room;
        } catch (error) {
            throw(error);
        }
    }

    async addUserToRoom(roomId, userId) {
        try{ 
            await Room.findByIdAndUpdate(roomId, {$push: {members: {member: userId}}});
        } catch (error) {
            throw(error);
        }
    }

    async removeUserfromRoom(roomId, userId) {
        try{ 
            await Room.findByIdAndUpdate(roomId, {$pull: {members: {member: userId}}});
        } catch (error) {
            throw(error);
        }
    }
}
module.exports = RoomRepository;
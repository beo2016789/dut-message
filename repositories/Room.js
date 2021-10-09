const Room = require('../models/Room');
class RoomRepository {
    async createRoom(arrayId){
        try {
            let memberArray = [];
            arrayId.map((id) => {
                memberArray.push({member: id});
            })
            const room = await Room.create({members: memberArray});
            return room;
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
            const room = await Room.findById(roomId).populate('list_message');
            return room.list_message;
        } catch (error) {

        }
    }

    async getAllRoomByUserId(userId){
        try{ 
        } catch (error) {
            throw(error);
        }
    }
}
module.exports = RoomRepository;
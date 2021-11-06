class RoomService {
    constructor(roomRepo) {
        this._roomRepo = roomRepo;
    }
    async createRoom(arrayId){
        try{
            let room = await this._roomRepo.createRoom(arrayId);
            return room;
        } catch(err){
            throw(err);
        }
    }

    async updateSeen(roomId, memberId){
        try{
            await this._roomRepo.updateSeen(roomId, memberId);
        } catch(err){
            throw(err);
        }
    }

    async getMessageByRoomId(roomId){
        try{
            const list_message = await this._roomRepo.getMessageByRoomId(roomId);
            return list_message;
        } catch(err){
            throw(err);
        }
    }

    async getAllRoomByUserId(userId){
        try{
            const list_room = await this._roomRepo.getAllRoomByUserId(userId);
            return list_room;
        } catch(err){
            throw(err);
        }
    }
}
module.exports = RoomService;
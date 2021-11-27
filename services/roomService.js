class RoomService {
    constructor(roomRepo) {
        this._roomRepo = roomRepo;
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

    async getListRoomIdsByUserId(userId) {
        try{
            const list_roomId = await this._roomRepo.getListRoomIdsByUserId(userId);
            return list_roomId;
        } catch(err){
            throw(err);
        }
    }

    async getRoomById(roomId) {
        try{
            const room = await this._roomRepo.getRoomById(roomId);
            return room;
        } catch(err){
            throw(err);
        }
    }
}
module.exports = RoomService;
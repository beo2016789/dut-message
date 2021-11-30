class MessageService {
    constructor(messageRepo, conversationRepo, roomRepo) {
        this._messageRepo = messageRepo;
        this._conversationRepo = conversationRepo;
        this._roomRepo = roomRepo;
    }

    async addMessageToConver(converId, message){
        try{
            const result = await this._messageRepo.createMessage(message);
            await this._conversationRepo.addMessage(converId, result._id);
            return result;
        }catch(err){
            throw(err);
        }
    }

    async removeMessageToConver(converId, messageId){
        try{
            await this._conversationRepo.removeMessage(converId, messageId);
            await this._messageRepo.removeMessage(messageId);
        } catch(err){
            throw(err);
        }
    }

    async softRemoveMessageToConver(messageId, userId){
        try{
            await this._messageRepo.softRemoveMessage(messageId, userId);
        } catch(err){
            throw(err);
        }
    }

    async addMessageToRoom(roomId, message){
        try{
            const result = await this._messageRepo.createMessage(message);
            await this._roomRepo.addMessage(roomId, result._id);
            return result;
        } catch(err){
            throw(err);
        }
    }
    
    async removeMessageToRoom(roomId, messageId){
        try{
            await this._roomRepo.removeMessage(roomId, messageId);
            await this._messageRepo.removeMessage(messageId);
        } catch(err){
            throw(err);
        }
    }

    async softRemoveMessageToRoom(messageId, userId){
        try{
            await this._messageRepo.softRemoveMessage(messageId, userId);
        } catch(err){
            throw(err);
        }
    }

    async createConversation(arrayId) {
        try {
            let conversation = await this._conversationRepo.createConversation(arrayId);
            return conversation;
        } catch (error) {
            throw(error);
        }
    }

    async getConverById(converId) {
        try{
            let conver = await this._conversationRepo.getConverById(converId);
            return conver;
        } catch (error) {
            throw(error);
        }
    }
    
    async updateSeenConver(converId, userInId) {
        try {
            await this._conversationRepo.updateSeen(converId, userInId);
        } catch (error) {
            throw(error);
        }
    }

    async createRoom(arrayId, nameAuthor){
        try{
            const nameRoom = "Nhóm của " + nameAuthor + " và " + (arrayId.length - 1) + " người bạn";
            const content = nameAuthor + " đã tạo nhóm này."
            let room = await this._roomRepo.createRoom(arrayId, nameRoom);
            await this.addMessageToRoom(room._id, {author: arrayId[0], content: content});
            const result_room = await this._roomRepo.getRoomByIdHaveListMessage(room._id);
            return result_room;
        } catch(err){
            throw(err);
        }
    }

    async getRoomById(roomId) {
        try{
            let room = await this._roomRepo.getRoomById(roomId);
            return room;
        } catch (err) {
            throw(err);
        }
    }

    async updateSeenRoom(roomId, memberId){
        try{
            await this._roomRepo.updateSeen(roomId, memberId);
        } catch(err){
            throw(err);
        }
    }
}
module.exports = MessageService;
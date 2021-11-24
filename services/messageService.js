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
}
module.exports = MessageService;
class ConversationService {
    constructor(conversationRepo){
        this._conversationRepo = conversationRepo;
    }

    async getConverById(converId){
        try{
            const conver = await this._conversationRepo.getConverById(converId);
            return conver;
        } catch(error){
            throw(error);
        }
    }

    async getAllConverByUserId(userId) {
        try{
            const list_conver = await this._conversationRepo.getAllConverByUserId(userId);
            return list_conver;
        } catch (error) {
            throw(error);
        }
    }
    async getMessageByConverId(converId) {
        try {
            const list_message = await this._conversationRepo.getMessageByConverId(converId);
            return list_message;
        }catch (error) {
            throw(error);
        }
    }
}
module.exports = ConversationService;
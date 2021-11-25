class ConversationService {
    constructor(conversationRepo){
        this._conversationRepo = conversationRepo;
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
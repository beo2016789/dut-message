class ConversationService {
    constructor(conversationRepo){
        this._conversationRepo = conversationRepo;
    }
    async createConversation(arrayId) {
        try {
            let conversation = await this._conversationRepo.createConversation(arrayId);
            return conversation;
        } catch (error) {
            throw(error);
        }
    }
    async updateSeen(converId, userInId) {
        try {
            await this._conversationRepo.updateSeen(converId, userInId);
        } catch (error) {
            throw(error);
        }
    }
}
module.exports = ConversationService;
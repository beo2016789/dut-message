const Conversation = require('../models/Conversation');
class ConversationRepository {
    async createConversation(arrayId) {
        try {
            let conversation = await Conversation.create({userIns: [{userIn: arrayId[0]}, {userIn: arrayId[1]}]});
            return conversation;
        } catch (error) {
            throw(error);
        }
    }

    async updateSeen(converId, userInId) {
        try {
            await Conversation.updateOne({_id: converId, 'userIns.userIn': userInId}, {$set: {'userIns.$.last_seen': Date.now()}});
        } catch(error) {
            throw(error);
        }
    }

    async addMessage(converId, messageId) {
        try{
            await Conversation.findByIdAndUpdate(converId, {$push: {list_message: messageId}})
        } catch(error) {
            throw(error);
        }
    }
    async removeMessage(converId, messageId) {
        try{
            await Conversation.findByIdAndUpdate(converId, {$pull: {list_message: messageId}})
        } catch(error) {
            throw(error);
        }
    }
    async getMessageByConverId(converId) {
        try{
            const conversation = await Conversation.findById(converId).populate('list_message');
            return conversation.list_message;
        } catch(error) {
            throw(error);
        }
    }

    async getAllConverByUserId(userId) {
        
    }
}
module.exports = ConversationRepository;
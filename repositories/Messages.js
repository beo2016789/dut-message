const Message = require('../models/Message');
class MessageRepository {
    async createMessage(message) {
        try{
            let message = await Message.create(message);
            return message;
        }catch(err){
            throw(err);
        }
    }

    async updateMessage(messageId, contentUpdate) {
        try{
            await Message.findByIdAndUpdate(messageId, {$set: {content: contentUpdate}});
        } catch(err){
            throw(err);
        }
    }

    async removeMessage(messageId) {
        try{
            await Message.findByIdAndRemove(messageId);
        } catch(err){
            throw(err);
        }
    }

}
module.exports = MessageRepository;
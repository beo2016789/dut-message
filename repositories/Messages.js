const Message = require('../models/Message');
class MessageRepository {
    async createMessage(message) {
        try{
            let result = await Message.create(message);
            return result;
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

    async softRemoveMessage(messageId, userId) {
        try{
            await Message.findByIdAndUpdate(messageId, {$push: {deleted_by: userId}});
        } catch(err){
            throw(err);
        }
    }

}
module.exports = MessageRepository;
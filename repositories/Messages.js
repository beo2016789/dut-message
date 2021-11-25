const Message = require('../models/Message');
class MessageRepository {
    async createMessage(message) {
        try{
            let ms = await Message.create(message);
            console.log(ms._id);
            let result = await Message.findById(ms._id).populate({path: 'author', select: ['_id', 'name', 'avatar']});
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
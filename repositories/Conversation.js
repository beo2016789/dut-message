const Conversation = require('../models/Conversation');
class ConversationRepository {
    async createConversation(arrayUser) {
        try {
            let arrayUserIn = [];
            arrayUser.map(user => {
                arrayUserIn.push({
                    userIn: user.id,
                    nick_name: user.nick_name,
                })
            })
            let conversation = await Conversation.create({userIns: arrayUserIn});
            const result = await this.getConverById(conversation._id);
            return result;
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
            const conversation = await Conversation.findById(converId).populate({path: 'list_message', populate: {path: 'author', select: ['_id', 'name', 'avatar', 'phone']}});
            return conversation.list_message;
        } catch(error) {
            throw(error);
        }
    }

    async getAllConverByUserId(userId) {
        try{
            const list_conver = await Conversation.find({
                userIns: {$elemMatch: {userIn: userId}}
            }).populate({
                path: 'userIns.userIn', 
                select: ['_id', 'name', 'avatar']
            }).populate({
                path: 'list_message',
                // options: {
                //     limit: 1, 
                //     sort: {$natural: -1}
                // },
                populate: {
                    path: 'author', 
                    select: ['_id', 'name', 'avatar', 'phone']
                }
            });
            return list_conver;
        } catch(error) {
            throw(error);
        }
    }

    async getConverById(converId) {
        try{
            const conversation = await Conversation.findById(converId, ['_id', 'userIns']).populate({path: 'userIns.userIn', select: ['_id', 'name', 'avatar', 'phone']});
            return conversation;
        } catch(error) {
            throw(error);
        }
    }
}
module.exports = ConversationRepository;
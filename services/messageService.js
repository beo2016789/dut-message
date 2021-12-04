class MessageService {
    constructor(messageRepo, conversationRepo, roomRepo, userRepo) {
        this._messageRepo = messageRepo;
        this._conversationRepo = conversationRepo;
        this._roomRepo = roomRepo;
        this._userRepo = userRepo;
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

    async removeMessage(messageId){
        try{
            await this._messageRepo.removeMessage(messageId);
        } catch(err){
            throw(err);
        }
    }

    async softRemoveMessage(messageId, userId){
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

    async createConversation(arrayId) {
        try {
            const list_name = await Promise.all(arrayId.map(async (id) => {
                const name = await this._userRepo.getNameById(id);
                return  name;
            }))
            const arrayUser = [];
            for(let i = 0; i < arrayId.length; i++) {
                arrayUser.push({
                    id: arrayId[i],
                    nick_name: list_name[i],
                })
            }
            let conversation = await this._conversationRepo.createConversation(arrayUser);
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

    async createRoom(arrayId, nameAuthor, nameRoom) {
        try{
            const content = nameAuthor + " đã tạo nhóm này";
            let arrayMember = [];
            const list_name = await Promise.all(arrayId.map(async (id) => {
                const name = await this._userRepo.getNameById(id);
                return  name;
            }))
            for(let i = 0; i < arrayId.length; i++) {
                arrayMember.push({
                    id: arrayId[i],
                    nick_name: list_name[i],
                });
            }
            let room = await this._roomRepo.createRoom(arrayMember, nameRoom);
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

    async removeUserFromRoom(roomId, userId) {
        try{
            await this._roomRepo.removeUserfromRoom(roomId, userId);
        } catch(err) {
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
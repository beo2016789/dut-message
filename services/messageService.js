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
            await this.addMessageToRoom(room._id, {author: arrayId[0], content: content, isNotify: true});
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

    async getRoomByIdHaveListMessage(roomId) {
        try{
            let room = await this._roomRepo.getRoomByIdHaveListMessage(roomId);
            return room;
        } catch(err){
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

    async addUserToRoom(roomId, userAddId, arrayUserIsAddedId) {
        try{
            let listNameIsAdd = await Promise.all(arrayUserIsAddedId.map(async (id) => {
                const name = await this._userRepo.getNameById(id);
                return  name;
            }))
            const nameAdd = await this._userRepo.getNameById(userAddId);
            let listContent = []
            listNameIsAdd.map(name => {
                listContent.push(nameAdd + " đã thêm " + name + " vào nhóm");
            })
            let list_message = await Promise.all(listContent.map(async (content) => {
                const message = await this.addMessageToRoom(roomId, {author: userAddId, content: content, isNotify: true});
                return message;
            }))
            await Promise.all(arrayUserIsAddedId.map(async (id) => {
                await this._roomRepo.addUserToRoom(roomId, id);
            }))
            return list_message;
        } catch(err){
            throw(err);
        }
    }

    async removeUserfromRoom(roomId, userId) {
        try{
            const name = await this._userRepo.getNameById(userId);
            const content = name + " đã rời khỏi nhóm";
            const message = await this.addMessageToRoom(roomId, {author: userId, content: content, isNotify: true});
            await this._roomRepo.removeUserfromRoom(roomId, userId);
            return message;
        } catch(err){
            throw(err);
        }
    }

    async checkExistConver(arrayId) {
        try{
            const conver = await this._conversationRepo.findConverByArrayUserId(arrayId);
            if(conver) {
                const result = await this._conversationRepo.getConverById(conver._id);
                return result;
            } else {
                return false;
            }
        } catch(err){
            throw(err);
        }
    }
}
module.exports = MessageService;
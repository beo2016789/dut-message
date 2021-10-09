class MessageService {
    constructor(messageRepo, conversationRepo, roomRepo) {
        this._messageRepo = messageRepo;
        this._conversationRepo = conversationRepo;
        this._roomRepo = roomRepo;
    }
}
module.exports = MessageService;
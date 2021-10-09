class ConversationController {
    constructor(conversationService) {
        this._conversationService = conversationService;
    }

    createConversation = async (req, res, next) => {
        try {
            let conversation = await this._conversationService.createConversation([req.headers.id, req.body.id])
            res.status(200).json(conversation);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = ConversationController;
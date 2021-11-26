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

    getAllConverByUserId = async (req, res, next) => {
        try{
            const list_conver = await this._conversationService.getAllConverByUserId(req.headers.id);
            res.status(200).json(list_conver);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    getMessageByConverId = async (req, res, next) => {
        try{
            const list_message = await this._conversationService.getMessageByConverId(req.params.converId);
            res.status(200).json(list_message);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = ConversationController;
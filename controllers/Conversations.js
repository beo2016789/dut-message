class ConversationController {
    constructor(conversationService) {
        this._conversationService = conversationService;
    }

    getAllConverByUserId = async (req, res, next) => {
        try{
            const list_conver = await this._conversationService.getAllConverByUserId(req.headers.id);
            res.status(200).json(list_conver);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    getMessageByConverId = async (req, res, next) => {
        try{
            const list_message = await this._conversationService.getMessageByConverId(req.params.converId);
            res.status(200).json(list_message);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    getConverById = async (req, res, next) => {
        try{
            const conver = await this._conversationService.getConverById(req.params.converId);
            res.status(200).json(conver);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}

module.exports = ConversationController;
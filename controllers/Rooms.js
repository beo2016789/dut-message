class RoomController {
    constructor(roomService) {
        this._roomService = roomService;
    }

    createRoom = async (req, res, next) => {
        try{
            let room = await this._roomService.createRoom([req.headers.id].concat(req.body.ids));
            res.status(200).json(room);
        } catch(error){
            res.status(500).json({error: error});
        }
    }

    getAllRoomByUserId = async (req, res, next) => {
        try{
            const list_room = await this._roomService.getAllRoomByUserId(req.headers.id);
            res.status(200).json(list_room);
        } catch(error){
            res.status(500).json({error: error});
        }
    }
    
    getMessageByRoomId = async (req, res, next) => {
        try{
            const list_message = await this._roomService.getMessageByRoomId(req.params.roomId);
            res.status(200).json(list_message);
        } catch(error){
            res.status(500).json({error: error});
        }
    }

    getAllRoomIdsByUserId = async (req, res, next) => {
        try{
            const roomIds = await this._roomService.getListRoomIdsByUserId(req.headers.id);
            res.status(200).json(roomIds);
        } catch(error){
            res.status(500).json({error: error});
        }
    }

    getRoomById = async (req, res, next) => {
        try{
            const room = await this._roomService.getRoomById(req.params.roomId);
            res.status(200).json(room);
        } catch(error){
            res.status(500).json({error: error});
        }
    }

    removeUserfromRoom = async (req, res, next) => {
        try{
            await this._roomService.removeUserfromRoom(req.body.roomId, req.body.userId);
            res.status(200).json({success: "success"});
        } catch(error){
            res.status(500).json({error: error});
        }
    }

    addUserfromRoom = async (req, res, next) => {
        try{
            await this._roomService.addUserToRoom(req.body.roomId, req.body.userId);
            res.status(200).json({success: "success"});
        } catch(error) {
            res.status(500).json({error: error})
        }
    }
}
module.exports = RoomController;
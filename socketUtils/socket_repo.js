class SocketRepository{
    constructor(){
        this.userMap = new Map();
    }

    addUserToMap(userId, socketId){
        this.userMap.set(userId, socketId);
    }

    removeUserBySocketId(socketId){

    }

    getSocketIdByUserId(userId){
        return this.userMap.get(userId)
    }
}

module.exports = SocketRepository;
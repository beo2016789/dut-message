class SocketRepository{
    constructor(){
        this.userMap = new Map();
    }

    addUserToMap(userId, socketId){
        this.userMap.set(userId, socketId);
        console.log(this.userMap)
    }

    removeUserBySocketId(socketId){
        let userId;
        for(let element of this.userMap) {
            if(socketId == element[1]){
                userId = element[0];
                break;
            }
        }
        if(undefined != userId){
            this.userMap.delete(userId);
        }
        console.log(this.userMap)
    }

    getSocketIdByUserId(userId){
        return this.userMap.get(userId);
    }
}

module.exports = SocketRepository;
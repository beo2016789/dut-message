const RequestResetPw = require('../models/RequestResetPw')

class RequestResetPwRepo {
    async createRequest(userId, email) {
        try{
            const request = await RequestResetPw.create({userId: userId, email: email});
            const result = await RequestResetPw.findById(request._id).populate({path: 'userId', select: ['_id', 'name', 'avatar', 'email']})
            return result;
        } catch(error){
            throw(error)
        }
    }

    async findRequest(requestId) {
        try{
            const request = await RequestResetPw.findById(requestId).populate({path: 'userId', select: ['_id', 'name', 'avatar', 'email']});
            return request;
        } catch(error){
            throw(error)
        }
    }

    async deleteRequest(requestId) {
        try{
            await RequestResetPw.findByIdAndDelete(requestId);
        } catch(error) {
            throw(error)
        }
    }
}

module.exports = RequestResetPwRepo;
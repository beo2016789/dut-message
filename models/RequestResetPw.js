const mongoose = require('mongoose');

const requestResetPwSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    email: {type: String, required: true},
});


module.exports = mongoose.model('RequestResetPw', requestResetPwSchema);
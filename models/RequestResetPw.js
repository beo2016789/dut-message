const mongoose = require('mongoose');

const requestResetPwSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    email: {type: String, required: true},
    status: {type: Number, default: 0},
}, {
    timestamps: true,
});

requestResetPwSchema.index({createAt: 1}, {expireAfterSeconds: 300})

module.exports = mongoose.model('RequestResetPw', requestResetPwSchema);
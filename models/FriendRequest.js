const mongoose = require('mongoose');

const FriendRequestSchema = new mongoose.Schema({
    from: {type: mongoose.Types.ObjectId, ref: 'User'},
    to: {type: mongoose.Types.ObjectId, ref: 'User'},
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false,
    }
})

module.exports = mongoose.model('FriendRequest', FriendRequestSchema);
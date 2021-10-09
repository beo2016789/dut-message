const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    userIns: [{
        userIn: {type: mongoose.Types.ObjectId, ref: "User", required: true},
        last_seen: {type: Date},
        nick_name: {type: String, default: ""},
    }],
    list_message: [{type: mongoose.Types.ObjectId, ref: "Message"}],
})

module.exports = mongoose.model('Conversation', conversationSchema);
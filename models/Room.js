const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    members: [{
        member: {type: mongoose.Types.ObjectId, ref: "User", required: true},
        nick_name: {type: String, default: ""},
        last_seen: {type: Date},
    }],
    list_message: [{type: mongoose.Types.ObjectId, ref: "Message"}],
})

module.exports = mongoose.model('Room', roomSchema);
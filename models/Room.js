const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    members: [{
        member: {type: mongoose.Types.ObjectId, required: true},
        nick_name: {type: String},
        last_seen: {type: Date},
    }],
    list_message: [{type: mongoose.Types.ObjectId, ref: "Message"}],
})

module.exports = mongoose.model('Room', roomSchema);
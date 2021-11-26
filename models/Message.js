const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: {type: String, required: true},
    status: {type: String, default: ""},
    isImg: {type: Boolean, default: false},
    deleted_by: [{type: mongoose.Types.ObjectId, ref: "User"}],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);
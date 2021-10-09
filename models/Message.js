const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: {type: String, required: true},
    status: {type: String, required: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);
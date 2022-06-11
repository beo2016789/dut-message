const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const messageSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: {type: String, required: true},
    status: {type: String, default: ""},
    message_type: {type: String, default: "text"},
    deleted_by: [{type: mongoose.Types.ObjectId, ref: "User"}],
    isNotify: {type: Boolean, default: false},
}, {
    timestamps: true,
});

messageSchema.plugin(mongooseDelete, {
    deleteAt: true,
})

module.exports = mongoose.model('Message', messageSchema);
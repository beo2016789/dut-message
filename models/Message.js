const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const messageSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: {type: String, required: true},
    status: {type: String, default: ""},
    isImg: {type: Boolean, default: false},
    deleted_by: [{type: mongoose.Types.ObjectId, ref: "User"}],
}, {
    timestamps: true,
});

messageSchema.plugin(mongooseDelete, {
    deleteAt: true,
})

module.exports = mongoose.model('Message', messageSchema);
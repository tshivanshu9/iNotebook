const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        index: true,
        required: true,
    }
});
module.exports = mongoose.model('notes', NotesSchema);
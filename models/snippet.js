const mongoose = require('mongoose');
const SnippetSchema = new mongoose.Schema({
    snippetName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true
    },
    user: {
        type: String,
        default: 'public'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Snippet', SnippetSchema);
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'General'
    },
    image: { type: String, default: '' }, // New Field
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('News', newsSchema);
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/chat_node', { useNewUrlParser: true })
            .then(() => console.log(`Connected to database...`));
}
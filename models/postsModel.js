const mongoose = require('mongoose');

const PostsModel = mongoose.model(
    // Nom de la base de donnee
    "node-api", 
    // Descrption de la table en question
    {
        author:{
            type: String,
            required: true
        },
        message:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        }

    },
    // Nom de la table
    "posts"
);

module.exports = { PostsModel };
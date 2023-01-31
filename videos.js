const mongoose = require("mongoose");

const videosSchema = mongoose.Schema({
    title:{
        type: String,
        maxlength: 50,
    },
    description:{
        type: String,
    },
    
    videoPath:{
        type: String,
    },

    views:{
        type: Number,
        default: 1000000
    },

    thumbnail:{
        type: String
    },

}, {timestamps: true})

module.exports = mongoose.model("videos", videosSchema)
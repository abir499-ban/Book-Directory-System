const {Schema, model} = require('mongoose');


const GenreSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    info:{
        type:String,
        required:true,
    },
    coverPic:{
        type:String,
    }
},{
    timestamps:true
})


const Genre = model("genre", GenreSchema);

module.exports = Genre;
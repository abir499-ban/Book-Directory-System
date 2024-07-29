const {Schema, model} = require('mongoose');


const GenreSchema = new Schema({
    genres:{
        type:[String],
        default:["Literature","Science", "Self-Motivation"]
    }
},{
    timestamps:true
})


const Genre = model("genre", GenreSchema);

module.exports = Genre;
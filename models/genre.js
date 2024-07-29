const {Schema, model} = require('mongoose');


const GenreSchema = new Schema({
    genres:{
        type:[String],
        default:["Literarture", "Science", "Self-Motivation"]
    }
},{
    timestamps:true
})


const Genre = model("genre", GenreSchema);

module.exports = Genre;
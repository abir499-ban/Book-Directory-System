const Genre = require("../models/genre");

 

async function get_genre(){
    try {
        const Genre_document = await Genre.find({});
        return Genre_document[0].genres
    } catch (error) {
        console.log(error);
        return ["NAN"];
    }
}


async function updategenre(x_genre){
    const genre_document = await Genre.find({});
    const genre_collection_array = genre_document[0].genres;
    if(!genre_collection_array.includes(x_genre)){
        genre_collection_array.push(x_genre);
        await genre_document[0].save();
        console.log("Genre added");
    }else{
        console.log("Genre already exists");
    }

}

module.exports = {
    get_genre,
    updategenre,
}
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

module.exports = {
    get_genre,
}
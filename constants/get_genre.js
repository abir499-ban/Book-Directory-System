const Genre = require("../models/genre");



async function get_genre() {
    try{
        const allGenres = await Genre.find({});
        return allGenres;
    }catch(error){
        console.log(error);
        return [];
    }
}


async function updategenre(title, info, coverPic) {
    try {
        const genre = await Genre.findOne({ title: title });
        if (genre) {
            console.log("Genre already exists");
            return;
        }

        await Genre.create({
            title: title,
            info: info,
            coverPic: coverPic,
        })
        console.log("Genre added");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    get_genre,
    updategenre,
}
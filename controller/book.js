const { updategenre, get_genre } = require("../constants/get_genre");
const { validateBookSchema, Book } = require("../models/book");
const Genre = require("../models/genre");
const { User } = require("../models/user");
const { updateBook } = require("../utils/helper/updatebookinUserSchema");



async function createBook(req, res, next) {
    const {bookTitle, genre, category, author, publisher, no_of_pages, isbn, description, coverImageURL, readLink } = req.body;
    try {
        validateBookSchema.parse({ bookTitle, author });
        const last_book_id = (await Book.find({})).length
        const book = await Book.create({
            id:last_book_id + 1,
            bookTitle: bookTitle,
            genre: genre,
            category: category,
            author: author,
            publisher: publisher ? publisher : "NA",
            no_of_pages: no_of_pages,
            isbn: isbn ? isbn : "NA",
            description: description,
            coverImageURL: coverImageURL ? coverImageURL : "/asset/default/book_cover.png",
            readURl: readLink ? readLink : 'null',
            postedby: req.user._id
        })
        
        // const updatedUser = await User.findByIdAndUpdate(req.user._id,{
        //     $push:{books:book._id}
        // })
        const updatedUser = await updateBook(req.user._id, book._id);

        const allGenres = await get_genre();
        //await updategenre(genre);
        return res.status(201).render("home",{
            user: updatedUser,
            success:true,
            message: "Book Added Succesfully!",
            allGenres: allGenres,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).render("addbook", {
            allGenres: await get_genre(),
            user : req.user,
            success:false,
            Error: error
        })
    }
}

module.exports = {
    createBook,
}
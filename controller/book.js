const { validateBookSchema, Book } = require("../models/book");
const { User } = require("../models/user");



async function createBook(req, res, next) {
    const { userId, bookTitle, genre, category, author, publisher, no_of_pages, isbn, description, coverImageURL, readLink } = req.body;
    const user = await User.findById(userId);
    try {
        validateBookSchema.parse({ bookTitle, author });
        const book = await Book.create({
            bookTitle: bookTitle,
            genre: genre,
            category: category,
            author: author,
            publisher: publisher ? publisher : "NA",
            no_of_pages: no_of_pages,
            isbn: isbn ? isbn : "NA",
            description: description,
            coverImageURL: coverImageURL ? coverImageURL : "/asset/default/book_cover.png",
            readLink: readLink ? readLink : 'null',
            postedby: userId
        })
        return res.status(201).render("home",{
            user: user,
            success:true,
            message: "Book Added Succesfully!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).render("addbook", {
            user : user,
            success:false,
            Error: error.issues[0].message
        })
    }
}

module.exports = {
    createBook,
}
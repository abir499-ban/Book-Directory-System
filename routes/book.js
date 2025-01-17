const { Router } = require('express');
const { restrictAccesstoAddBook, restrictuser } = require('../middlewares/auth');
const { createBook } = require('../controller/book');
const { get_genre, updategenre } = require('../constants/get_genre');
const { Book } = require('../models/book');
const Genre = require('../models/genre');
const router = Router();

router.get('/addbook', restrictAccesstoAddBook, async (req, res) => {
    const allGenres = await get_genre();
    return res.render("addbook", {
        user: req.user,
        allGenres: allGenres
    })
})

router.post('/addbook', restrictAccesstoAddBook,createBook);

router.get('/getbooks/:genre', restrictuser, async (req, res) => {
    const genre = req.params.genre;
    const allBooks = await Book.find({ genre: genre }).populate('postedby');
    return res.render("getBooks", {
        genre: genre,
        allBooks: allBooks,
        user: req.user,
    });
})


router.get('/getbooks/:genre/:id', restrictuser, async (req, res) => {
    const bookid = req.params.id;
    const genre = req.params.genre;
    const book = await Book.findOne({ id: bookid }).populate('postedby');
    return res.render("book", {
        book: book,
        genre: genre,
        user: req.user,
    })
})



router.post('/:id', restrictuser,async(req,res)=>{
    const bookid = req.params.id;
    try {
        await Book.findByIdAndDelete(bookid);
        return res.render('home', {
            user:req.user,
            allGenres: await get_genre(),
            success:true,
            message: "Book deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.render("home",{
            user:req.user,
            allGenres: await get_genre(),
            success:false,
            Error:"Error in Deleting book"
        })
    }
})




router.post('/create_genre', async (req, res) => {
    try {
        const { genre } = req.body;
        await updategenre(genre);
        return res.send("No errors");
    } catch (error) {
        console.log("error is adding genre");
    }
})

router.post('/create',async(req,res)=>{
    try {
        await Genre.create({});
        return res.send("Done");
    } catch (error) {
        return res.send("Error");
    }
})


module.exports = router
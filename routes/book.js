const {Router} = require('express');
const { restrictAccesstoAddBook, restrictuser } = require('../middlewares/auth');
const { createBook } = require('../controller/book');
const { get_genre } = require('../constants/get_genre');
const { Book } = require('../models/book');
const router = Router();

router.get('/addbook', restrictAccesstoAddBook,async(req,res)=>{
    const allGenres = await get_genre();
    console.log(allGenres)
    return res.render("addbook",{
        user:req.user,
        allGenres: allGenres
    })
})

router.post('/addbook', createBook);

router.get('/getbooks/:genre',restrictuser ,async(req,res)=>{
    const genre = req.params.genre;
    const allBooks = await Book.find({genre:genre}).populate('postedby');
    console.log(allBooks);
    return res.render("getBooks",{
        genre:genre,
        allBooks:allBooks,
        user:req.user,
    });
})



module.exports = router
const {Router} = require('express');
const { restrictAccesstoAddBook } = require('../middlewares/auth');
const { createBook } = require('../controller/book');
const { get_genre } = require('../constants/get_genre');
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

router.get('/getbooks/:genre', (req,res)=>{
    const genre = req.params.genre;
    console.log(genre);
    return res.render("getBooks",{
        genre:genre,
    });
})



module.exports = router
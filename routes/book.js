const {Router} = require('express');
const { restrictAccesstoAddBook } = require('../middlewares/auth');
const { createBook } = require('../controller/book');
const router = Router();

router.get('/addbook', restrictAccesstoAddBook,(req,res)=>{
    return res.render("addbook",{
        user:req.user,
    })
})

router.post('/addbook', createBook)


module.exports = router
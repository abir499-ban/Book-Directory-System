const {Router} = require('express');
const { restrictAccesstoAddBook } = require('../middlewares/auth');
const addBlog = require('../controller/blog');
const router = Router();


router.get('/addblog', restrictAccesstoAddBook, (req,res)=>{
    return res.render("addblog",{
        user: req.user
    })
})

router.post('/addblog', restrictAccesstoAddBook, addBlog);


module.exports = router;
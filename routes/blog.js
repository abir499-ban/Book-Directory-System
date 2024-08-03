const {Router} = require('express');
const { restrictAccesstoAddBook, restrictuser } = require('../middlewares/auth');
const addBlog = require('../controller/blog');
const Blog = require('../models/blog');
const router = Router();


router.get('/addblog', restrictAccesstoAddBook, (req,res)=>{
    return res.render("addblog",{
        user: req.user
    })
})

router.post('/addblog', restrictAccesstoAddBook, addBlog);

router.get('/getblog', restrictuser,async(req,res)=>{
    return res.render("viewblogs",{
        user: req.user,
        allBlogs: await Blog.find({}).populate("postedBy")
    })
})

router.get('/:id', restrictuser, async(req,res)=>{
    const id = req.params.id;
    const blog = await Blog.findById(id).populate("postedBy");
    return res.render("blog",{
        user:req.user,
        blog: blog
    })
})


module.exports = router
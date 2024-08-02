const { Router } = require('express');
const router = Router();
const { handleSignUp, handleusersignin } = require('../controller/user');
const { restrictAccessto_LogIn_and_SignUp, accesstoProfile } = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');
const { User } = require('../models/user');
const { get_genre } = require('../constants/get_genre');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.resolve('./public/uploads'));
    },
    filename: function(req,file,cb){
        const filename = `${Date.now()}_${file.originalname}`
        cb(null, filename);
    }
})

const upload = multer({storage:storage});

router.post('/signup', upload.single('profile_pic'), handleSignUp);

router.get('/signup', restrictAccessto_LogIn_and_SignUp,(req,res)=>{
    return res.render('signup');
})

router.get('/signin', restrictAccessto_LogIn_and_SignUp , (req,res)=>{
    return res.render('signin');
})

router.post('/signin', handleusersignin);

router.get('/:id', accesstoProfile,async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        return res.render("profile",{
            user:user
        })
    } catch (error) {
        console.log(error);
        return res.render("home",{
            user:req.user,
            allGenres:await get_genre(),
            success:false,
            Error:'Server error occured'
        })
    }
} )

module.exports = router
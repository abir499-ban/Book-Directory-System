const { Router } = require('express');
const router = Router();
const { handleSignUp, handleusersignin } = require('../controller/user');
const { restrictAccessto_LogIn_and_SignUp } = require('../middlewares/auth');

router.post('/signup',  handleSignUp)

router.get('/signup', restrictAccessto_LogIn_and_SignUp,(req,res)=>{
    return res.render('signup');
})

router.get('/signin', restrictAccessto_LogIn_and_SignUp , (req,res)=>{
    return res.render('signin');
})

router.post('/signin', handleusersignin);

module.exports = router
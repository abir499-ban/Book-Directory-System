const { Router } = require('express');
const router = Router();
const { handleSignUp, handleusersignin } = require('../controller/user');

router.post('/signup', handleSignUp)

router.get('/signup', (req,res)=>{
    return res.render('signup');
})

router.get('/signin', (req,res)=>{
    return res.render('signin');
})

router.post('/signin', handleusersignin);

module.exports = router
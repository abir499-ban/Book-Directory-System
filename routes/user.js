const { Router } = require('express');
const router = Router();
const { handleSignUp } = require('../controller/user');

router.post('/signup', handleSignUp)

router.get('/signup', (req,res)=>{
    return res.render('signup');
})


module.exports = router
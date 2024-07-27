const { validateTOKEN } = require("../utils/service/auth");
const {User}  =require('../models/user')

async function restrictAccessto_LogIn_and_SignUp(req,res,next){
    //console.log("inside middleware");
    const token = req.cookies.token;
    if(!token) return next();
    try {
        //console.log('token found ',token);
        const payload = await validateTOKEN(token);
        if(!payload) return next();
        return res.render("home",{
            user:payload
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}


async function restrictuser(req,res,next){
    const token = req.cookies.token;
    if(!token) return next();
    try {
        const payload = await validateTOKEN(token);
        if(!payload) return next();
        req.user = payload;
        return next();
    } catch (error) {
        console.log("Error in authenticating")
    }
}

module.exports = {
    restrictAccessto_LogIn_and_SignUp,
    restrictuser
}
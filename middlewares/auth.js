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


async function restrictAccesstoAddBook(req,res,next){
    const token = req.cookies.token;
    if(!token) return res.status(400).render("home",{
        success:false,
        Error:"Sign in first to add a book"
    })
    try {
        const payload = await validateTOKEN(token);
        if(!payload) return res.status(400).render("home",{
            success:false,
            Error:"error in accessing the route"
        })
        req.user = payload;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).render("home",{
            success:false,
            Error:"server Error"
        })
    }
}

async function accesstoProfile(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.json({message:"Cant access profile page without user login"});
    }
    try{
        const payload = await validateTOKEN(token);
        req.user = payload;
        return next();
    }catch(error){
        console.log(error);
        return res.json({Error:"Server error"});
    }
}
module.exports = {
    restrictAccessto_LogIn_and_SignUp,
    restrictuser,
    restrictAccesstoAddBook,
    accesstoProfile,
}
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
        const user = await User.findById(payload._id);
        console.log("user found!! ");
        return res.render("home",{
            user:user
        });
    } catch (error) {
        console.log(error);
        return next();
    }
}

module.exports = {
    restrictAccessto_LogIn_and_SignUp
}
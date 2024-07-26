function restrictAccessto_LogIn_and_SignUp(req,res,next){
    const token = req.cookies.token;
    if(!token) return next();
    return res.render("home");
}

module.exports = {
    restrictAccessto_LogIn_and_SignUp
}
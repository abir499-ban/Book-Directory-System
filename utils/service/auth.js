const jwt = require('jsonwebtoken');
const secret_key = process.env.TOKEN_SECRET;
require('dotenv').config();
async function createToken(user){
    
    const payload = {
        _id:user._id,
        name:user.name,
        email:user.email,
        profilePic:user.profilePic,
    }
    
    const token =  jwt.sign(payload,secret_key,{
        expiresIn:"1d"
    });
    return token;
}


async function validateTOKEN(token){
    try{
        return jwt.verify(token, secret_key);
    }catch(error){
        console.log("Error in verifying token");
    }
}
module.exports = {
    createToken,
    validateTOKEN
}
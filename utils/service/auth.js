const jwt = require('jsonwebtoken');
const secret_key = process.env.TOKEN_SECRET;
require('dotenv').config();

async function createToken(user){
    
    
    const payload = {
        _id:user._id,
        name:user.name,
        email:user.email,
    }
    
    const token =  jwt.sign(payload,secret_key);
    return token;
}

module.exports = {
    createToken
}
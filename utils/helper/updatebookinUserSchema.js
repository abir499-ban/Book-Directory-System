const { Book } = require("../../models/book");
const { User } = require("../../models/user");
const mongoose = require('mongoose');

async function updateBook(userId, bookid) {
    try {
        const updated_user = await User.findByIdAndUpdate(userId,{
            $push:{
                books:bookid
            }
        })
        console.log("Updated userdata");
        return updated_user;
    } catch (error) {
        console.log("Error");
        throw new Error(error);
    }
}

module.exports = {
    updateBook,
}
const mongoose = require('mongoose');
const mogodb = require('mongodb');
require('dotenv').config();
const mongodb_url = process.env.MONGO_URI;

async function connectTOmongoDB() {
    if (!mongodb_url) throw new Error("No mongo db url");
    return mongoose.connect(mongodb_url).then(() => {
        console.log("MongoDb connected succesfully");
    })
}

module.exports = {
    connectTOmongoDB
}
const express = require('express');
const PORT = process.env.port || 8000;
const app = express();
const path = require('path');
const {connectTOmongoDB} = require('./connection');
require("dotenv").config();




app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));











app.get('/', (req,res) =>{
    return res.send("HOME");
})

try{
    connectTOmongoDB();
}catch(error){
    console.log("Sorry MongoDB could not be connected");
}



app.listen(PORT, ()=>{
    console.log("Server is live at ", PORT);
})


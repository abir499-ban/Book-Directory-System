const express = require('express');
const PORT = process.env.port || 8000;
const app = express();
const path = require('path');
const {connectTOmongoDB} = require('./utils/connection');
require("dotenv").config();
const UserRouter = require('./routes/user')



app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));











app.get('/', (req,res) =>{
    return res.send("HOME");
})


app.use('/user', UserRouter);

try{
    connectTOmongoDB();
}catch(error){
    console.log("Sorry MongoDB could not be connected");
}



app.listen(PORT, ()=>{
    console.log("Server is live at ", PORT);
})


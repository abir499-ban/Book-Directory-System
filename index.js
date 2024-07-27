const express = require('express');
const PORT = process.env.port || 8000;
const app = express();
const path = require('path');
const {connectTOmongoDB} = require('./utils/connection');
require("dotenv").config();
const UserRouter = require('./routes/user')
const cookie_parser = require('cookie-parser');
const { restrictuser } = require('./middlewares/auth');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookie_parser());











app.get('/', restrictuser, (req,res) =>{
    return res.render("home",{
        user:req.user
    });
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


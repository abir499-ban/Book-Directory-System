const express = require('express');
const PORT = process.env.port || 8000;
const app = express();
const path = require('path');
const {connectTOmongoDB} = require('./utils/connection');
require("dotenv").config();
const UserRouter = require('./routes/user')
const BookRouter = require('./routes/book')
const cookie_parser = require('cookie-parser');
const { restrictuser } = require('./middlewares/auth');
const { get_genre } = require('./constants/get_genre');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookie_parser());
app.use(express.static(path.resolve('./public')));











app.get('/', restrictuser, async(req,res) =>{
    const allGenres = await get_genre();
    return res.render("home",{
        allGenres: allGenres,
        user:req.user
    });
})


app.use('/user', UserRouter);
app.use('/book', BookRouter);





try{
    connectTOmongoDB();
}catch(error){
    console.log("Sorry MongoDB could not be connected");
}



app.listen(PORT, ()=>{
    console.log("Server is live at ", PORT);
})


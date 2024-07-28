const mongoose = require('mongoose');
const {z} = require('zod');

const BookSchema = new mongoose.Schema({
    id:{
        type:Number,
    },
    bookTitle:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    publisher:{
        type:String,
        default:'NA',
    },
    no_of_pages:{
        type:Number,
        required:true,
    },
    isbn:{
        type:String,
        default:'NA'
    },
    description:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        default:'/asset/default/book_cover.png'
    },
    readURl:{
        type:String,
        default:null
    },
    postedby:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user",
    },

},{
    timestamps: true
})


const validateBookSchema = z.object({
    bookTitle : z.string().min(4,"Book Title must be of atleast 4 characters"),
    author : z.string().min(4,"author name must be of atleast 4 characters"),

})

const Book = mongoose.model("book", BookSchema);


module.exports  ={
    Book,
    validateBookSchema
}
const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const BlogSchema = new Schema({
    BlogTitle:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverPic:{
        type:String,
        default: '/asset/default/blog_cover.png'
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},{
    timestamps:true
})


const Blog = model("blog", BlogSchema);


module.exports = Blog
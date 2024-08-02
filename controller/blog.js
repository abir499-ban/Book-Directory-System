const { get_genre } = require("../constants/get_genre");
const Blog = require("../models/blog");
const update_blog_info = require("../utils/helper/updateBlogref");


async function addBlog(req,res){
    const {blogTitle, blogBody,coverPic} = req.body;
    try {
        const blog =  await Blog.create({
            BlogTitle : blogTitle,
            body: blogBody,
            coverPic : coverPic ? coverPic : '/asset/default/blog_cover.png',
            postedBy: req.user._id,
        })

        console.log("Blog created successfully");
        const updated_user = await update_blog_info(req.user._id, blog._id);
        return res.render("home",{
            success:true,
            allGenres: await get_genre(),
            message:"Blog Added Successfully",
            user: updated_user,
        })
    } catch (error) {
        console.log(error);
        return res.render("addblog", {
            user:req.user
        })
    }
}

module.exports = addBlog
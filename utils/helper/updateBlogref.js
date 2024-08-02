const { User } = require("../../models/user");


async function update_blog_info(userid, blogid){
    try{
        const updated_user  = await User.findByIdAndUpdate(userid,{
            $push:{
                blogs: blogid
            }
        })
        return updated_user;
    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}

module.exports = update_blog_info
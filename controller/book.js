


async function createBook(req,res,next){
    console.log("inside controller");
    console.log(req.body.userId);
}

module.exports = {
    createBook,
}
const {User, UservalidateSchema} = require('../models/user')


async function handleSignUp(req,res){
    const {name, email,password, gender, birthdayDate} = req.body;
    const bd = new Date(birthdayDate);
    if((!bd instanceof Date)) return res.status(400).json({message:"Invalid date"});
    try {
        UservalidateSchema.parse({name, email, password, gender, birthdayDate:bd });

        const user = await User.create({
            name: name,
            email: email,
            password: password,
            gender:gender,
            birthdayDate: bd,
        })
        return res.status(201).json({ message: "User created" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ Error: error.issues[0].message });
    }
}


module.exports = {
    handleSignUp,
}
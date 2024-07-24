const {User, UservalidateSchema} = require('../models/user');
const { createToken } = require('../utils/service/auth');


async function handleSignUp(req,res){
    const {name, email,password, gender, birthdayDate} = req.body;
    const bd = new Date(birthdayDate);
    if((!bd instanceof Date)) return res.status(401).json({Error:"Invalid date"});
    const doesUserexist = await User.findOne({email:email});
    if(doesUserexist) return res.status(401).json({Error:"User already exist"});
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

async function handleusersignin(req,res){
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({Error:"This email does not exist. Sign up first",sucess:false});
        const sanitized_user = await User.matchPassword(email,password);
        const token = await createToken(sanitized_user);
        res.cookie("token",token);
        return res.status(201).json({message:"successfull login",success:true,user:sanitized_user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({Error:"Wrong Password", success:false});
    }
}

module.exports = {
    handleSignUp,
    handleusersignin
}
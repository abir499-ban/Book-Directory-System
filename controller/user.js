const { User, UservalidateSchema } = require('../models/user');
const { createToken } = require('../utils/service/auth');
const { get_genre } = require('../constants/get_genre')

async function handleSignUp(req, res) {
    const { name, email, password, gender, birthdayDate } = req.body;
    const bd = new Date(birthdayDate);
    if ((!bd instanceof Date)) return res.status(401).json({ Error: "Invalid date" });
    const doesUserexist = await User.findOne({ email: email });
    if (doesUserexist) return res.status(401).json({ Error: "User already exist" });
    try {
        UservalidateSchema.parse({ name, email, password, gender, birthdayDate: bd });

        const user = await User.create({
            name: name,
            email: email,
            password: password,
            gender: gender,
            birthdayDate: bd,
            profilePic: req.file ? `/uploads/${req.file.filename}` : '/asset/default/user_avatar.png'
        })
        const allGenres = await get_genre();
        return res.status(201).render("home", {
            success: true,
            message: "User created",
            user: user,
            allGenres: allGenres,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).render('signup', {
            success: false,
            Error: error.issues[0].message
        });
    }
}

async function handleusersignin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).render("signin", {
            Error: "This email does not exist. Sign up first", sucess: false
        });
        const sanitized_user = await User.matchPassword(email, password);
        const token = await createToken(sanitized_user);
        res.cookie("token", token);
        return res.status(201).render("home",
            { message: "successfull login", success: true, user: sanitized_user, allGenres: await get_genre() })
    } catch (error) {
        console.log(error);
        return res.status(500).render("signin", { Error: "Wrong Password", success: false });
    }
}

async function getUserProfile(req, res) {
    const id = req.params.id;
    if(req.user._id !== id) return res.render("home",{
        Error:"Cannot view other users's profile",
        success:false,
        allGenres: await get_genre(),
        user : req.user,
    })
    try {
        const user = await User.findById(id).populate("books");
        return res.render("profile", {
            user: user,
            alreadyOnprofile : true,
        })
    } catch (error) {
        console.log(error);
        return res.render("home", {
            user: req.user,
            allGenres: await get_genre(),
            success: false,
            Error: 'Server error occured'
        })
    }
}

module.exports = {
    handleSignUp,
    handleusersignin,
    getUserProfile,
}
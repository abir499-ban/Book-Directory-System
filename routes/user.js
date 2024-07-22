const { Router } = require('express');
const router = Router();
const { User, UservalidateSchema } = require('../models/user')

router.post('/signup', async (req, res) => {
    try {
        UservalidateSchema.parse(req.body);

        const { name, email, password, birthdayDate } = req.body;
        const user = await User.create({
            name: name,
            email: email,
            password: password,
            birthdayDate: birthdayDate,
        })
        return res.status(201).json({ message: "User created" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})
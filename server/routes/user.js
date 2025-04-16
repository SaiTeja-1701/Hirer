const { Router } = require('express');
const User = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkCookies = require('../middlewares/auth');
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'mohit@123';

// Login route
// Login route
router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        // Using the passmatch static method from the schema
        const token = await User.passmatch(Email, Password);

        // Fetch the user details based on email after the password match
        const user = await User.findOne({ Email });

        // Send the response with the token and user details
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
        }).status(200).json({ token, user: { id: user._id, name: user.Name, email: user.Email } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
});
;

// Signup route
// ✅ Correct
// Signup route
router.post('/signup', async (req, res) => {
    const { Name, Email, Password } = req.body;
    console.log("🔥 Signup body received:", req.body);

    try {
        // Check if the user already exists with the same Name or Email
        const userExists = await User.findOne({ $or: [{ Name }, { Email }] });
        if (userExists) {
            return res.json({ message: "User already exists with the same Name or Email" });
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(Password, salt);
        
        // Create new user with correct fields matching the schema
        await User.create({ Name, Email, Password: Password });

        return res.json({ message: "Signup successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: false, error: err.message });
    }
});

module.exports = router;
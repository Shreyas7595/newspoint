const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// REGISTER API
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken! Try another.' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Registration Successful!' });
    } catch (err) {
        // YAHAN EXACT ERROR DIKHEGA
        console.error("Backend Register Error:", err);
        res.status(400).json({ message: err.message }); 
    }
});

// LOGIN API
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
        res.json({ token, userId: user._id, role: user.role }); // role bhej diya
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/create-user', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(400).json({ error: "Enter a unique email" });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
        });
        const data = {
            user: {
                id: user._id,
            }
        };
        const token = jwt.sign(data, JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
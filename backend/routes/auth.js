const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

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
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.json(user);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
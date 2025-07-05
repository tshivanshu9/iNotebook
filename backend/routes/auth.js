const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', (req, res, next) => {
    const user = User(req.body);
    user.save();
    res.send(req.body);
    next();
});
module.exports = router;
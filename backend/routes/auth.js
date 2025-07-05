const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const data = {
        name: 'this',
        number: 34
    }
    res.json(data);
    next();
});
module.exports = router;
const jwt = require('jsonwebtoken');
require('dotenv').config();

fetchuser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Unauthorized" });
    }
}
module.exports = fetchuser;
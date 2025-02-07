const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

// Middleware to verify JWT
module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        req.userId = decoded.id;
        next();
    });
};

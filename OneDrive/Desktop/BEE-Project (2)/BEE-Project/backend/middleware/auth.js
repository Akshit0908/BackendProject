const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('Authorization');

    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token (Bearer <token>)
        const tokenParts = token.split(' ');
        const tokenToVerify = tokenParts.length === 2 && tokenParts[0] === 'Bearer' ? tokenParts[1] : token;

        const decoded = jwt.verify(tokenToVerify, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

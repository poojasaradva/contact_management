const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });
        req.user = user;
        next();
    });
};
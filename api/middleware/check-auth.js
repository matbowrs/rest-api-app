const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Split because it ouput looks like Bearer 'tokenInfo'
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        // We do not need to parse the body here, instead we can send it 
        // (the token) in the header under 'Authorization'

        //const decoded = jwt.verify(req.body.token, 'supersecretkey');
        const decoded = jwt.verify(token, 'supersecretkey');
        req.userData = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'You do not have permission to view this.'
        });
    }
};
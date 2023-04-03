const jwt = require('jsonwebtoken');

const authUserToken = (req, res, next) => {
    //let token = req.session.token;
    const token = req.header('authorization');
    if (!token) {
        return res.status(403).send({
            message: 'Token is not present!'
        });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!'
            });
        }
        req.user = decoded;
        next();
    });
};

const authCustomerToken = (req, res, next) => {
    //let token = req.session.token;
    const token = req.header('authorization');
    if (!token) {
        return res.status(403).send({
            message: 'Token is not present!'
        });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!'
            });
        }
        req.customer = decoded;
        next();
    });
};

const authJwt = {
    authUserToken: authUserToken,
    authCustomerToken: authCustomerToken
};


module.exports = authJwt;
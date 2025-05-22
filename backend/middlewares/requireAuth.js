const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const jwt_secret = process.env.jwt_secret;

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({message : 'Auth token is required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, jwt_secret);

        const user = await User.findById(_id).select("_id");
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message : 'Unable to authenticate user. Check your token'});
    }
}

module.exports = requireAuth;
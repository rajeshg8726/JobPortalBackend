const jwt = require('jsonwebtoken');
const key = "rajeshg@8726";

const generateAuthToken = (user) => {
    const token = jwt.sign({userId: user._id, email: user.email} , key, { expiresIn: '1h' });
    return token;
}



const verifyUser = (token) => {
    if(!token)return null;

    return jwt.verify(token, key);
}

module.exports = {
    generateAuthToken,
    verifyUser,
}

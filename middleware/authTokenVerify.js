const jwt = require('jsonwebtoken');
const key = "rajeshg@8726";


const generateToken = (req, res , next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if(!token){
      return  res.status(401).json({message:"Access Denied!"});
    }

    try {
        const verify = jwt.verify(token , key);
        req.user = verify;
        next();
    } catch (error) {
      res.status(401).json({message:"Access Denied!"});

    }

}

module.exports = generateToken; 
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
    const authHeader =  req.get('Authorization');
    if(!authHeader){
        // no access to anything
        req.isAuth =  false;
        return next();
    }
    const tokrn = authHeader.split(' ')[1]; //eg: Bear dfafasf
    if(!tokrn || token === ''){
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'somekey');
    } catch(err) {
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();

};
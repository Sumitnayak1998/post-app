const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) =>{
  const bearerToken =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;
  const cookieToken = req.cookies?.token;
  const token = bearerToken || cookieToken;

  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({success: false, message: "Invalid or expired token"})
    }
  }else{
    return res.status(401).json({success:false, message:"please provide token"})
  }
};

exports.authorize = (...roles) =>{
  return (req, res, next) =>{
    if(!req.user){
      return res.status(401).json({success:false, message: "not authenticated"});
    }
    if(!roles.includes(req.user.role)){
      return res.status(403).json({success:false, message: "you are not authorized to use this route"})
    }
    next();
  }
}

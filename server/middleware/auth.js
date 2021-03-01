const jwt = require("jsonwebtoken");
//teraz patrzy czy ogolnie token jest poprawny a nie jakis konkretny
module.exports = function (req, res, next) {
  const jwtSecret = "mysecrettoken";
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json("Dont have any token");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    
    //req.user sam wymyslilem o moze byc tak wszystko inne
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json("Token is not valid");
  }
};

import jwt from "jsonwebtoken";

const secret = 'wow';
//create middleware which separate user and admin and veryfy it using jwt   
export const verifyUser = (req, res, next) => {
    if(!req.headers.token) return res.status(401).json({message:"Unauthorized"})
    const token = req.headers.token.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided" });
    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next(); 
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
}

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, secret, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  };
  
 export  const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
  export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
  






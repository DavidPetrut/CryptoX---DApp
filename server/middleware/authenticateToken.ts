import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import "../utils/types"


function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  console.log("Received authHeader:", authHeader); 

  const token = authHeader && authHeader.split(" ")[1];
  console.log("Extracted Token:", token); 

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    console.log("JWT Verification Error:", err); 
    console.log("Decoded User:", user); 

    if (err) {
      return res.status(403).json({ message: "Token is invalid or expired" });
    }
    req.user = user;
    next();
  });
}

export default authenticateToken;



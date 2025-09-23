import AuthenticationError from "../exception/authenticationError.js";
import jwt from 'jsonwebtoken';

export const authMiddleware =  (req,res,next) => {
    const authheader = req.headers[`authorization`].split(' ')[1];
    console.log("FROM AUTH MIDDLEWARE",authheader);
    try {
        const decodedToken =  jwt.verify(authheader,process.env.JWT_SECRET_KEY);
        console.log(decodedToken);
        req.user = decodedToken
        next()
    } catch (error) { 
        throw new AuthenticationError('Unauthorized : invalid missing token');
    }
}
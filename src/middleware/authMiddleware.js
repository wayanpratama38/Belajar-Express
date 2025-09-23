import AuthenticationError from "../exception/authenticationError.js";


export const authMiddleware = (req,res,next) => {
    const authheader = req.headers[`authorization`];

    if(!authheader || authheader === 'mysecrettoken'){
        throw new AuthenticationError('Unauthorized : invalid missing token');
    }

    next();
}
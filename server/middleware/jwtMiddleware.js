// jwt auth middleware
import jwt from 'jsonwebtoken';
import TOKEN_SECRET from '../config/config.js';

const jwtMiddleware = (req,res,next)=>{
    try{
        const token = req.headers.Authorization;
        console.log(token)
        if(!token) throw new Error("No Token available in cookie"); // error triggered if no token is present in cookie
        console.log(`1 under token check`)
        jwt.verify(token,TOKEN_SECRET,(error,decoded)=>{
            if(error) throw new Error(error);   

            req.token = decoded; // attaches token attribute to req object
            console.log("2 under token decoding") 

            next();
        })
    }catch(error){
        return res.json({
            msg:"Access token is not valid",
            err:error
        }).status(403);
    }
}

export default jwtMiddleware;
import {PrismaClient} from '@prisma/client'
import { verifyAuth } from '../../utils/utils.js';
import jwt from 'jsonwebtoken';
import TOKEN_SECRET from '../../config/config.js';

const prisma = new PrismaClient();

const login = async (req,res)=>{
    // controllers is triggered when '/login' endpoint is hit.
    try{
        const {email,authKey} = req.query; // email and authKey generated on client side (from hash of hash((hash(email|master password))| master password) are query parameters for the get request
        // console.log(userName,masterPassword)
        const user = await prisma.user.findUniqueOrThrow({ // ORM queries user model to find unique user with email and includes auth model data due to the 1:1 relationship or throws error which triggers catch block
            where:{
                email:email
            },
            include:{
                auth:true
            }
        })
        console.log(`User is ${user}`)
        console.log(user);
        const hashedAuthKey = user.auth.authKey; // returns hashed auth key from db
        const salt = user.auth.salt; // returns random 5 character salt 
        
        if(!verifyAuth(authKey,hashedAuthKey,salt)) throw new Error("No match between auth key and hashed auth key") // verifies auth key against hashed auth key, throws error which triggers catch block
          
        const payload = {
            // creates payload object which is signed to create a json web token (jwt)
            email:user.email,
            userName:user.userName,
            // authKeyHash:hashedAuthKey,
            authId:user.auth.id // POSSIBLE DESIGN FLAW, authId which corresponds to unique user auth string            
        }
        console.log("BEFORE TOKEN SIGNING")
        console.log(payload);
        const token = jwt.sign(payload,TOKEN_SECRET,{
            expiresIn:'1hr'
        }) // creating jwt token when user succesfully logs in
        console.log("UNDER SIGNING");
        // cookie stored as http only cookie which is only accessible by the server and not by the client 
        // res.cookie("token", token, {
        //   path: "/",
        //   domain: "http://passwordmanagerbucket.s3-website-us-east-1.amazonaws.com",
        //   maxAge: new Date(Date.now() + 3600000),
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: "None",
        // })
        // res.cookie('token',token,{ expires: new Date(Date.now() + 3600000), httpOnly: true, secure: true,domain:"http://passwordmanagerbucket.s3-website-us-east-1.amazonaws.com"}) // stores jwt token in httpOnly cookie which is sent in each subsequent request      
        return res.json({
            token:token, // json web token 
            msg:"login succesful",
            statusCode:200
        }).status(200)
        console.log("SUCCESS")
    }catch(error){
        console.log(error);
        return res.json({
            msg:"login error", 
            statusCode:400          
        }).status(400)
    }
}

export default login;
import { PrismaClient } from "@prisma/client";
import { auth } from "express-oauth2-jwt-bearer";

const prisma = new PrismaClient();


const addPassword = async (req,res)=>{
    // controller is triggered when the '/addPassword' endpoint is hit
    const {siteName,encryptedPassword} = req.body; // destructures post request JSON object payload from post request

    try{
        const token = req.token;
        const authId = token.authId; // returns authId associated with one user(1:1) and many encrypted passwords(1:m)
        console.log(typeof authId);
        if(!authId) throw "Error";
        const add = await prisma.encPassword.create({
            data:{
                encPassword:encryptedPassword,
                siteName:siteName,
                authId:authId
                
            }
        })
        console.log(add);
        return res.json({
            statusCode:201,
            msg:"Succesfully added encrypted password"
        }).status(201)
    }catch(error){
        console.log(error);
        return res.json({
            statusCode:400,
            msg:"Error could not add encrypted password"
        }).status(400)
    }
}

export default addPassword;
import { PrismaClient } from "@prisma/client";
import hashAuthKey from "../../utils/utils.js";

const prisma = new PrismaClient();

const createUser = async (req,res)=>{
    try{
        const {userName,email,authKey} = req.body; // destructures req body 
        const authHashKey = await hashAuthKey(authKey); // auth key hash which is stored subsequently in the auth table model
        console.log(authHashKey);
        const user = await prisma.user.create({
            data:{
                userName:userName,
                email:email,
                auth:{  
                    create:{
                        authKey:authHashKey,
                    }
                }
            }
        })
        await prisma.$disconnect()
        
        return res.json({
            statusCode:201,
            userName:userName,
            email:email,
            authKey:authHashKey
        }).status(201)
    }catch(error){
        console.log(error)
        return res.json({
            statusCode:400,
            msg:error
        }).status(400)
    }
}

export default createUser;
import { PrismaClient } from "@prisma/client";
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient();

const a = process.env.DATABASE_URL;
console.log(a)

const checkUsernameExists = async (req,res)=>{
    // checkUsernameExists controller is triggered when '/checkUsername' endpoint is hit 
    const {username} = req.query; // destructures request query 
    console.log(username)

    try{
        await prisma.user.findUniqueOrThrow({
            where:{
                userName:username
            }
        })

        return res.json({
            bool:true
        })

    }catch(error){
        console.log(error)
        return res.json({
            bool:false
        })
    }



}

export default checkUsernameExists;
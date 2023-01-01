import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkUsernameExists = async (req,res)=>{
    // checkUsernameExists controller is triggered when '/checkUsername' endpoint is hit 
    const {username} = req.query; // destructures request query 

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
        return res.json({
            bool:false
        })
    }



}

export default checkUsernameExists;
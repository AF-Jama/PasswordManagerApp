import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkUserEmail = async (req,res)=>{
    // check user controller is triggered and returns boolean if email is present when '/checkUser' endpoint is hit  
    const {email} = req.query; // destructures request query
    console.log(email)

    try{
        await prisma.user.findUniqueOrThrow({ // finds unique user based on a user email and triggers catch block if no unique user is returned 
            where:{
                email:email
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

export default checkUserEmail;
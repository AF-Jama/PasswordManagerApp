import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const deletePassword = async (req,res)=>{
    // delete password controller is triggered when '/deletePassword/:passwordId' endpoint is hit 
    try{
        const {passwordId} = req.params; // destructuring request parameters which deletes user password based on the position of the user password array

    }catch(error){
        console.log(error);
    }
}

export default deletePassword;
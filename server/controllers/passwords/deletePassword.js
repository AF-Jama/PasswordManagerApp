import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const deletePassword = async (req,res)=>{
    // delete password controller is triggered when '/deletePassword/:passwordId' endpoint is hit 
    try{
        console.log(req.params)
        const { passwordId } = req.params

        const passwordID = parseInt(passwordId);

        console.log(passwordId)

        await prisma.encPassword.delete({
            where:{
                id:passwordID,
            }
        })

        return res.json({
            msg:`deleted password`,
            statusCode:200
        })
        
        // delete password based on password id
        // let {passwordId} = req.params; // destructuring request parameters which deletes user password based on the position of the user password array. Each card is assigned a key when rendered

        // passwordId = parseInt(passwordId); // returns int representation of passwordIndex param

        // // const { authId } = req.token; // destructuring jsonwebtoken to expose authId 

        // // const allPasswords = await prisma.encPassword.findMany({
        // //     where:{
        // //         authId:authId
        // //     }
        // // }) // returns all passwords with authId, due to the one to many relationship between auth and encPassword model

        // // delete logic 

        // // const password = allPasswords[passwordIndex];

        // // let passwordId = password.id; // returns password id of password

        // await prisma.encPassword.delete({
        //     where:{
        //         id:passwordId,
        //     }
        // }) // delete password based on password id 




    }catch(error){
        // triggered 
        return res.json({
            msg:"cannot delete may be due server error and/or password may not exist on server",
            statusCode:410
        })
        console.log(error);
    }
}

export default deletePassword;
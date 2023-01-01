import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

const getAllPasswords = async (req,res)=>{
    // controller is triggered when '/getAllPasswords' endpoint is hit 
    try{
        const token = req.token; // uses token attribute which is attached to the req object 
        const authId = token.authId;
        console.log(`Auth id is ${authId}`)
        if(!authId) throw "Error";
        const uniqueAuth = await prisma.auth.findUnique({
            // find unique auth row  
            where:{
                id:authId
            }
        })
        if(!uniqueAuth) throw new Error("Could not find user"); // error triggered if authId is not returned
        const userEncrypedPasswords = await prisma.$queryRaw`SELECT ENCPASSWORD.ID,ENCPASSWORD.ENCPASSWORD,ENCPASSWORD.SITENAME FROM AUTH JOIN ENCPASSWORD ON AUTH.ID=ENCPASSWORD.AUTHID AND ENCPASSWORD.AUTHID=${authId}` // raw query which peforms inner join(join) on auth and encrypted password model
        console.log(userEncrypedPasswords); // REMOVE BEFORE VERSION CONTROL

        return res.json({
            data:userEncrypedPasswords
        }).status(200)

    }catch(error){
        return res.json({
            msg:"Unable to validate request and return all user passwords",
            err:error
        })

        console.log("GET ALL PASSWORDS ERROR");
    }
}

export default getAllPasswords;
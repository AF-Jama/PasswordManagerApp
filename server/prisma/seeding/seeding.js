import { PrismaClient } from "@prisma/client";
import createVaultKey,{createAuthKey,hashAuthKey,verifyAuth} from "../../utils/utils.js";

const prisma = new PrismaClient();

const masterPassword = "Thisismypassword123."; // mock master password (40 charecters)
const email = "jamesmanning01@prismamail.com"
const masterPlusEmail = masterPassword+email;

const foo = async ()=>{
    let a = await createVaultKey(email,masterPassword);
    let b = await createAuthKey(a,masterPassword);
    let c = await hashAuthKey(b);

    return c;
}

const databaseSeeding = async()=>{
    // const userJames = await prisma.user.create({
    //     data:{
    //         userName:"JamesManning",
    //         email:email,
    //         auth:{
    //             create:{
    //                 authKey: await foo(),
    //             }
    //         }
    //     }
    // })
    const addPassword = await prisma.encPassword.create({
        data:{
            encPassword:"sfhdkhdsdhsldhdfshsfd",
            siteName:"Google",
            authId:1
        }
    })
    console.log(addPassword)
    // console.log(userJames);
}

databaseSeeding()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
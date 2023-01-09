import { PrismaClient } from "@prisma/client";
import { json } from "express";

const prisma = new PrismaClient();

const getPasswords = async (req,res)=>{
    let {start = 0,limit,cursor} = req.query; // destructures query object

    start = parseInt(start); // type casts string query parameter into int
    limit = parseInt(limit); // type casts string query parameter into int
    cursor = parseInt(cursor); // type casts string query parameter into int 

    console.log(typeof limit);
    console.log(start);
    console.log(cursor);

    try{
        // triggered if start or limit query parameters are evaluates to null
        if(!limit) throw new Error('limit query parameter must be specified')
        if(start!=0 && !cursor) throw new Error("Cursor must be specified if start is not 0");

        const authId = req.token.authId; // returns from jwt token authId 

        if(!authId) throw new Error("Auth id does not exist");

        // const totalPasswordsCount = await prisma.encPassword.count({
        //     where:{
        //         authId:authId
        //     }
        // }) // returns total number of results based on the where condition where encrypted password have a foreign key(authId)

        const allPasswords = await prisma.encPassword.findMany({
            where:{
                authId:authId
            }
        }) // return total number of results based on where conditon of authId foreign key        

        // console.log(`Total number of passwords is ${totalPasswordsCount}`);
        // console.log(`Last id of all passwords is ${allPasswords[allPasswords.length-1].id}`);

        const passwords = await prisma.encPassword.findMany({
            take: limit, // specifies number of results to "take" per page 
            skip: (start===0)?undefined:1, // if start query parameter is 0 then skip should be null else skip should be 1 to ensure last result is skipped 
            cursor: (start===0)?undefined:{
                id:cursor
            }, // ternary operator which sets cursor 
            where:{
                authId:authId
            },
            orderBy:{
                id:"asc"
            }

        }) // returns passwords as pages depending on the cursor and limit(number of results of pages)

        return res.json({
            // next is triggered if last password of users total passwords does not match the last password of a particular page. If ids match it means the last page has been reached 
            next:(allPasswords[allPasswords.length-1].id===passwords[passwords.length-1].id)?'':`/passwords/getPasswords?start=${start+limit}&limit=${limit}&cursor=${passwords[passwords.length-1].id}`,
            'results':passwords,
            prev:(start===0)?'':`/passwords/getPasswords?start=${start-limit}&limit=${limit}&cursor=${passwords[0].id}` // need to implement reverse api endpoint 
        })
        
    }catch(error){
        return res.json({
            statusCode:400,
            msg:error
        })
    }
}

export default getPasswords;
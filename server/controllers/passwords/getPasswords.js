import { PrismaClient } from "@prisma/client";
import { json } from "express";

const prisma = new PrismaClient();

const getPasswords = async (req,res)=>{
    let {page,limit=4,cursor} = req.query; // destructures query object

    page = parseInt(page); // type casts string query parameter into int
    limit = parseInt(limit); // type casts string query parameter into int
    cursor = parseInt(cursor); // type casts string query parameter into int 

    console.log(typeof limit);
    console.log(cursor);

    try{
        // triggered if start or limit query parameters are evaluates to null
        if(!page) throw new Error('page query parameter must be specified')

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
            skip: (page===1)?undefined:1, // if page query parameter is 1 then skip should be null else skip should be 1 to ensure last result is skipped from previous page 
            cursor: (page===1)?undefined:{
                id:allPasswords[((page)*limit)-limit-1].id // returns id of cursor for next page
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
            next:(allPasswords[allPasswords.length-1].id===passwords[passwords.length-1].id)?'':`/passwords/getPasswords?page=${page+1}&limit=${limit}`,
            'results':passwords,
            prev:((page-1)===0)?'':`/passwords/getPasswords?page=${page-1}&limit=${limit}` // need to implement reverse api endpoint 
        })
        
    }catch(error){
        console.log("SUCCESFULLO")  
        console.log(error)
        return res.json({
            statusCode:400,
            "results":[], // returns empty results array on error
            msg:"unable to retrieve"
        })
    }
}

export default getPasswords;
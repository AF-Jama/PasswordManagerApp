import { pbkdf2Sync } from 'pbkdf2';


const SALTROUNDS = 10;

const createVaultKey =  (email,master)=>{
    // creates vault key -> which is used to encrypt and decrypt passwords
    let masterPlusEmail = email+master
    let hashs = pbkdf2Sync(masterPlusEmail,'',100,32,'sha512');
    hashs = hashs.toString('hex');    
    return hashs; // return vault key hash
}

const createAuthKey = (vaultKey,master)=>{
    // creates auth key -> auth key is used to validate password vault 
    let vaultKeyPlusMaster = vaultKey+master;
    let hashs = pbkdf2Sync(vaultKeyPlusMaster,'',100,32,'sha512');
    hashs = hashs.toString('hex');
    return hashs; // return auth key hash 
}

const hashAuthKey = (authKey)=>{
    let genSalt = generateSalt(); // generates 5 character salt
    // creates auth key hash -> auth key hash stored in auth table for each user (1:1 relationship)
    let hashs = pbkdf2Sync(authKey,genSalt,1000,32,'sha512');
    hashs = hashs.toString('hex');
    return {hashs,genSalt}; // return hashs and salt to be stored against db auth table
}

const generateSalt = () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 5; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result; // returns random 5 character salt string 
}


const verifyAuth = (authKey,hashedAuthKey,salt) =>{
    // verifies auth password with hashed auth key 
    let hashs = pbkdf2Sync(authKey,salt,1000,32,'sha512');
    hashs = hashs.toString('hex');
    
    // returns boolean if hashed auth key match or not 
    if(hashs===hashedAuthKey) return true;  
    return false; 

}//closes verifyPassword

export default hashAuthKey
export {
    hashAuthKey,
    verifyAuth
}

// genSalt(1).then(res=>console.log(res))
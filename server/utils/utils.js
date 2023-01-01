import {hash,compare} from 'bcrypt'


const SALTROUNDS = 10;

const createVaultKey =  async (email,master)=>{
    // creates vault key -> which is used to encrypt and decrypt passwords
    let masterPlusEmail = email+master
    let hashs = await hash(masterPlusEmail,SALTROUNDS);
    return hashs;
}

const createAuthKey = async (vaultKey,master)=>{
    // creates auth key -> auth key is used to validate password vault 
    let vaultKeyPlusMaster = vaultKey+master;
    let hashs = await hash(vaultKeyPlusMaster,SALTROUNDS)
    return hashs;
}

const hashAuthKey = async (authKey)=>{
    console.log(`Auth key to hash in server is ${authKey}`)
    // creates auth key hash -> auth key hash stored in auth table for each user (1:1 relationship)
    let hashs = await hash(authKey,SALTROUNDS);
    return hashs; // return hashs and salt to be stored against db auth table
}

const  verifyAuth = async (authKey,hashedAuthKey) =>{
    // verifies auth password with hashed auth key 
  return await compare(authKey,hashedAuthKey); // returns boolean 
}//closes verifyPassword

export default hashAuthKey
export {
    hashAuthKey,
    verifyAuth
}

// genSalt(1).then(res=>console.log(res))
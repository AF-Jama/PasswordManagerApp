import {hash} from 'bcryptjs';
// import { decode } from 'jsonwebtoken';
// const {hash} = require('bcrypt')

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

// const decodeToken = (token)=>{
//         // returns decoded token which contains payload specified when logged in
//         /* {
//             email,
//             userName,
//             authId
//         } */
//     return decode(token);
// }

export default createVaultKey;
export{
    createAuthKey,
};

// createAuthKey('sdskdjfd','klsdmdjkdsd').then(hash=>console.log(hash))
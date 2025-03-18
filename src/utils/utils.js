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
const generateRandomString = () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 5; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result; // returns random 5 character salt string 
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

const keyframeShake = {
    transform:[
        "translate(1px, 1px) rotate(0deg)",
        "transform: translate(-1px, -2px) rotate(-1deg)",
        "transform: translate(-3px, 0px) rotate(1deg)",
        "transform: translate(3px, 2px) rotate(0deg)",
        "transform: translate(1px, -1px) rotate(1deg)",
        "transform: translate(-1px, 2px) rotate(-1deg)",
        "transform: translate(-3px, 1px) rotate(0deg)",
        "transform: translate(3px, 1px) rotate(-1deg)",
        "transform: translate(-1px, -1px) rotate(1deg)",
        "transform: translate(1px, 2px) rotate(0deg)",
        "transform: translate(1px, -2px) rotate(-1deg)"
    ]
}

export default createVaultKey;
export{
    createAuthKey,
    keyframeShake,
    generateRandomString
};

// createAuthKey('sdskdjfd','klsdmdjkdsd').then(hash=>console.log(hash))
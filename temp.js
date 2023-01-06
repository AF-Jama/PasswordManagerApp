const { pbkdf2Sync } = require('pbkdf2');


const a = pbkdf2Sync('c174b18fa4553cb97a14c5d6841a8461b3e782a2fa8dfbefd8351463580ec255','qusek',1000,32,'sha512');
console.log(a.toString('hex'));
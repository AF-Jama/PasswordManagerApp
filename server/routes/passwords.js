import express from 'express'
import jwtMiddleware from '../middleware/jwtMiddleware.js';
import getAllPasswords from '../controllers/passwords/getAllPasswords.js';
import getPasswords from '../controllers/passwords/getPasswords.js';
import addPassword from '../controllers/passwords/addPassword.js';
import deletePassword from '../controllers/passwords/deletePassword.js';

let router = express.Router();


router.get('/getAllPasswords',jwtMiddleware,getAllPasswords);

router.get('/getPasswords',jwtMiddleware,getPasswords);

router.post('/addPasswords',jwtMiddleware,addPassword);

router.delete('/deletePassword/:passwordId',jwtMiddleware,deletePassword);


export default router;
import express from 'express'
import createUser from '../controllers/users/create.js'
import login from '../controllers/users/login.js'
import checkUsernameExists from '../controllers/users/checkUsernameExists.js'
import checkUserEmail from '../controllers/users/checkUserEmail.js'

let router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create',createUser); // creates user

router.get('/login',login) // login user endpoint

router.get('/checkUserEmail',checkUserEmail);

router.get('/checkUsername',checkUsernameExists);

export default router;

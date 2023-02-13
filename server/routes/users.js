import express from 'express'
import createUser from '../controllers/users/create.js'
import login from '../controllers/users/login.js'
import checkUsernameExists from '../controllers/users/checkUsernameExists.js'
import checkUserEmail from '../controllers/users/checkUserEmail.js'

let router = express.Router()

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create',createUser); // creates user

router.get('/login',login) // login user endpoint

router.get('/checkUserEmail',checkUserEmail);

router.get('/checkUsername',checkUsernameExists);

export default router;

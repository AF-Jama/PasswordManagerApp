import express from 'express';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import * as dotenv from 'dotenv';
// var logger = require('morgan');  

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import passwordRouter from './routes/passwords.js'

// FLAG -> MAY NEED TO REFACTOR IF BELOW CAUSES UNFORSEEN ERROR/BUGS IN FUTURE
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)

var app = express();
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('trust proxy',1);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors({
//   origin:"http://passwordmanagerbucket.s3-website-us-east-1.amazonaws.com",
//   credentials:true,
//   methods: ['GET', 'PUT', 'POST',"DELETE"], 
//   allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], 
//   maxAge: 600, 
//   exposedHeaders: ['*', 'Authorization','set-cookie'] 

// }))
app.use(cors());

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', "http://passwordmanagerbucket.s3-website-us-east-1.amazonaws.com");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//   next();
// });
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/passwords',passwordRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
  //   next(createError(404));
  // });
  
  // // error handler
  // app.use(function(err, req, res, next) {
    //   // set locals, only providing error in development
    //   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.use('/index',require('./routes/index.js'))
// app.use('/user',require('./routes/users.js'))

app.get('/',(req,res)=>{
  return res.json({
    "test":"SUCCESFUL"
  })
})

app.get('/test',(req,res)=>{
  return res.json({
    "test":"SUCCESFULllo"
  })
})

// app.get('/test',getAuthHash)

const PORT  = process.env.PORT||5050; // process.env.PORT or port 5050 

app.listen(PORT,()=>{
  console.log(`Listening on port ${process.env.PORT||5050 }`) // stdout listening on port 5050 or process.env.PORT
})

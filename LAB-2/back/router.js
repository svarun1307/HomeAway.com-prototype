var express = require('express')
var app = express.Router()

var cookieParser = require('cookie-parser');
var multer  = require('multer');

var upload = multer({ dest: 'uploads/' });
var mysql = require('mysql');
var dbconn = require('./db');
var helper = require('./helper');
const uuidv1 = require('uuid/v1');
var validator = require('validator');
const path = require('path');
const fs = require('fs');
var passport = require('passport');
var jwt = require('jsonwebtoken');

// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//***************KAFFA REQS ***************/
var kafka = require('./kafka/client');




/***************PASSPORT JS SETTINGS**************/

app.use(passport.initialize());
// Bring in defined Passport Strategy
require('./config/passport')(passport);



/**************MONGOOSE SETTINGS******************/

const {mongoose,jwtsecret} = require('./mongoose/mongoose');
var {Users} = require('./models/users');
var {Property} = require('./models/property');
var db = mongoose.connection;


/************BCRYPT SETTINGS ************/
const bcrypt = require('bcrypt');
const saltRounds = 10;
  



const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
/**********MULTER SETTINGS ***************/

  /* var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {      
      cb(null, Date.now() + '.' + mime.getExtension(file.mimetype)); //Appending .jpg
    },
    limits: { fieldSize: 25 * 1024 * 1024 }
});*/
//var upload = multer({ storage : storage }).array('uploadSelect',5); 

/* var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {      
      cb(null, Date.now() + '.' + mime.getExtension(file.mimetype)); //Appending .jpg
    },
    limits: { fieldSize: 25 * 1024 * 1024 }
}); */

aws.config.update({
    // Your SECRET ACCESS KEY from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: "PQujDV0uWk7N3IbR6Wz9TfKwd2XJpj8gozO2VMOP",
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId: "AKIAI6K4ARD54TLVNC7Q",
    region: 'us-east-1' // region of your bucket
});

const s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'homeawaytest',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, "011438531-cmpe273-homeaway-"+Date.now().toString())
      }
    })
  }).array('uploadSelect',5); 




  /****************
 * 
 * 
 * ASYNC QUERY METHOD FOR MONGODB 
 * 
 * 
 * ************** */



async function executeAsyncQueryMongo(mdb1,mdb2,mdb3,mdb4 = {}){

    //console.log(mdb1);
    //console.log(mdb2);
    if(mdb3 == 'find')
    {
        /************SELECT QUERY*************** */
        return new Promise(function(resolve, reject) {
            mdb1.find( mdb2 , mdb4 , function(err,user){
                if (err) 
                {
                    reject(err);
                }
                else
                {
                    resolve(user);
                }
            })
        });
    }
    else if(mdb3 == 'insert')
    {
        /*************INSERT QUERY****************** */
        return new Promise(function(resolve, reject) {
            mdb1.save().then((data,doc,count)=>{
                console.log(data);
                console.log(doc);
                console.log(count);
                resolve(data);
            },(err)=>{
                reject(err);
            })
  
        });
    }
    else if(mdb3 == 'update')
    {
        /*************UPDATE QUERY****************** */
        return new Promise(function(resolve, reject) {
            mdb1.updateMany(mdb2,mdb4).then((data,doc,count)=>{
                resolve(data);
            },(err)=>{
                reject(err);
            })
  
        });
    }
    else if(mdb3 == 'aggregate')
    {
        return mdb1.find(mdb2, {}).sort(mdb4['sort']).skip(mdb4['skip']).limit(mdb4['limit']).exec();
    }


} 

app.get("/",function(req,res){
    console.log("On home page");

});

/* app.get("/",function(req,res){
    console.log("tes");
    

  

    kafka.make_request('post_book',{"BOOKS":"ASD"}, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });

    
    //res.send("-1");

}); */
app.post('/imgtest',function(req,res){
    upload(req, res, function(err, some) {
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
        console.log(req.files.location);
        res.json({'imageUrl': req.files[0].location,'tots':req.files.length});
      });

});


/****************
 * 
 * 
 * ADD PROPERTY ROUTE
 * 
 * ************** */

 /*******************OWNER POST PROPERTY *****************/
app.post('/addProperty', requireAuth ,async function (req, res, next) {

  if(req.user[0]['user_random'])
  {
      let uploadError = 0;
      upload(req,res,async function(err) {
        if(err) {
            console.log(err);
            uploadError = -1;
            res.send("-1");
        }
        if(uploadError == 0)
        {   
            let passdata = { perform : 'ADD_PROPERTY' , performdata : req.body , sessionid : req.user[0]['user_random'] , files : req.files}
            kafka.make_request('property',passdata, function(err,results){
                console.log('in result');
                console.log(results);
                if (err){
                    console.log("Inside err");
                    res.json("-1")
                }else{
                    console.log("Inside else");
                    console.log(results);
                        res.json(results);            
                        res.end();
                    }                
            });
        }
        else
        {
          res.send("-1");
        }
      });
    }
    else 
    {
      res.send("-1");
    }

});


/****************
 * 
 * 
 * USER LOGIN VALIDTION ROUTE
 * 
 * ************** */

app.post("/login-validate",async function(req,res){
    
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  console.log("test");
  console.log(req.body);

  let {loginemail,loginpassword,loginType} = req.body;
  loginemail = loginemail.trim();
  loginpassword = loginpassword.trim();
  if(loginemail.trim()=='' || loginpassword.trim()=='')
  {
      res.send(JSON.stringify({"code":"-1","error_type":"BLANK_ERROR"}));
  }
  else if(!validator.isEmail(loginemail))
  {
      res.send(JSON.stringify({"code":"-1","error_type":"EMAIL_ERROR"}));
  }
  else
  {

        let conditions = { 
                $and: [ 
                    { email: loginemail }, 
                    { acctype: loginType} 
                ] 
        };

        let retM = await executeAsyncQueryMongo(Users,conditions,'find');
        console.log(retM);
        try
        {
            if(Array.isArray(retM))
            {
                if(retM.length == 1)
                {
                    console.log("FINAL RES");
                    console.log(retM);
                    //console.log(rows);
                    let rows = retM;
                    console.log(rows[0]);
                    console.log(rows[0]["ex2"]);
                    let oldHash = rows[0]["ex2"];
                    console.log(loginpassword);
                    bcrypt.compare(loginpassword, oldHash, function(err, rescheck) {
                        if(rescheck)
                        {
                            console.log(rows[0]["name"]);
                            /* if(rows[0]["name"][0]=="'" && rows[0]["name"][rows[0]["name"].length-1]=="'")
                                rows[0]["name"] = rows[0]["name"].substring(1,rows[0]["name"].length-1);

                            if(rows[0]["ex1"][0]=="'" && rows[0]["ex1"][rows[0]["ex1"].length-1]=="'")
                                rows[0]["ex1"] = rows[0]["ex1"].substring(1,rows[0]["ex1"].length-1); */
                            
                            //var token = jwt.sign(rows[0]["user_random"], jwtsecret);
                            var token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                data: { 'userrandom': rows[0]["user_random"] }
                              }, jwtsecret);
                            
                            console.log("TKEN====")
                            console.log(token);
                            req.session.user = rows[0]['user_random'];
                            res.cookie('isLogged','true',{'maxAge': 900000});
                            res.cookie('user',loginemail,{'maxAge': 900000});
                            res.cookie('trcker',rows[0]["user_random"],{'maxAge': 900000});
                            res.cookie('firstname',rows[0]["name"],{'maxAge': 900000});
                            res.cookie('lastname',rows[0]["ex1"],{'maxAge': 900000});
                            res.cookie('login-type',loginType,{'maxAge': 900000});
                            res.cookie('user-token',token, { 'maxAge': 900000});

                            //res.send("+1");
                            res.send(JSON.stringify({
                                "code":"+1",
                                "error_type":"VALID",
                                "full_details":rows[0],
                                "userID":rows[0]["user_random"],
                                "isLogged" : true,
                                "trcker" : rows[0]["user_random"],
                                "firstname" : rows[0]["name"],
                                "lastname" : rows[0]["ex1"],
                                "login-type" : loginType,
                                "user-token" : token,
                                "user" : loginemail,
                            }));
                        }
                        else 
                        {
                            res.send(JSON.stringify({"code":"-1","error_type":"INVALID"}));
                        }
                    });  
                }
                else
                {
                    res.send(JSON.stringify({"code":"-1","error_type":"EMAIL_NOT_EXIST"}));
                }
            }
            else if(retM === null)
            {
                res.send(JSON.stringify({"code":"-1","error_type":"EMAIL_NOT_EXIST"}));
            }
        }
        catch(e)
        {
            console.log(e);
            res.send(JSON.stringify({"code":"-1","error_type":"DB_ERROR"}));  
        }

    /*
      let CheckingQuery = " SELECT * FROM `users` WHERE `email`='"+loginemail+"' AND `acctype`='"+loginType+"' ";
      console.log(CheckingQuery);
      dbconn.query(CheckingQuery,function(err,rows,fields){
          if(!err)
          {
              if(rows.length == 1)
              {
                  //console.log(rows);
                  console.log(rows[0]);
                  console.log(rows[0]["ex2"]);
                  let oldHash = rows[0]["ex2"];
                  console.log(loginpassword);
                  bcrypt.compare(loginpassword, oldHash, function(err, rescheck) {
                      if(rescheck)
                      {
                          console.log(rows[0]["name"]);
                        if(rows[0]["name"][0]=="'" && rows[0]["name"][rows[0]["name"].length-1]=="'")
                            rows[0]["name"] = rows[0]["name"].substring(1,rows[0]["name"].length-1);

                        if(rows[0]["ex1"][0]=="'" && rows[0]["ex1"][rows[0]["ex1"].length-1]=="'")
                            rows[0]["ex1"] = rows[0]["ex1"].substring(1,rows[0]["ex1"].length-1);
                        

                        req.session.user = rows[0]['user_random'];
                        res.cookie('isLogged','true',{'maxAge': 900000});
                        res.cookie('user',loginemail,{'maxAge': 900000});
                        res.cookie('trcker',rows[0]["user_random"],{'maxAge': 900000});
                        res.cookie('firstname',rows[0]["name"],{'maxAge': 900000});
                        res.cookie('lastname',rows[0]["ex1"],{'maxAge': 900000});
                        res.cookie('login-type',loginType,{'maxAge': 900000});
                        //res.send("+1");
                        res.send(JSON.stringify({"code":"+1","error_type":"VALID","userID":rows[0]["user_random"]}));
                      }
                      else 
                      {
                        res.send(JSON.stringify({"code":"-1","error_type":"INVALID"}));
                      }
                });    
              }
              else
              {
                res.send(JSON.stringify({"code":"-1","error_type":"EMAIL_NOT_EXIST"}));
              }
          }
          else 
          {
            res.send(JSON.stringify({"code":"-1","error_type":"DB_ERROR"}));
          }

      })
      */
  }
  
  //res.send("-1");

});



/****************
 * 
 * 
 * USER COMMON SIGNUP (SELLER AND TRAVELLER) ROUTE
 * 
 * 
 * ************** */


app.post("/user-signup",async function(req,res){

  res.set({ 'content-type': 'application/json; charset=utf-8' });
  console.log(req.body);

  /******************SIGNUP USER WITH KAFKA QUEUE *************************/
  let passdata = { perform : 'USER_SIGNUP' , performdata : req.body }
  kafka.make_request('users',passdata, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            res.json(results);

            res.end();
        }
    
});

  

     /* let CheckingQuery = " SELECT * FROM `users` WHERE `email`='"+signupemails+"' AND `acctype`='"+loginType+"' ";
      console.log(CheckingQuery);
      dbconn.query(CheckingQuery,function(err,rows,fields){
        //if(!err)
        //{
          if(rows.length==0)
          {
            let _m = req.body;
            bcrypt.genSalt(saltRounds, function(err, salt) {            
              bcrypt.hash(_m.signuppassword, salt, function(err, hash) {
                  // Store hash in your password DB.
                  console.log(rows.length);
                  console.log(_m.signuppassword);
                  console.log(hash);
                  let currentTime = Date.now();
                  let currentPropID = uuidv1();
                  let insertTEMPUser = "INSERT INTO `users` (`id`, `user_random`, `name`, `email`, `phone`, `about`, `city`, `country`, `company`, `school`, `hometown`, `languages`, `gender`, `joinedon`, `acctype`, `photo`, `photodata`, `ex1`, `ex2`, `ex3`) VALUES (NULL,'"+currentPropID+"','"+firstnames+"','"+signupemails+"','','','','','','','','','','"+currentTime+"','"+loginType+"','','','"+lastnames+"','"+hash+"','')";
                  console.log(insertTEMPUser);
                  dbconn.query(insertTEMPUser,function(err,rows,fields){
                    if(!err)
                    {
                      console.log(err);
                      res.send(JSON.stringify({"code":"+1","error_type":"SUCC"}));
                    }
                    else 
                      res.send(JSON.stringify({"code":"-1","error_type":"DB_ERROR"}));  
                  });
              });
          });
            
          }
          else if(rows.length >=1)
          {
              res.send(JSON.stringify({"code":"-1","error_type":"USER_EXISTS"}));  
          }
      }); */

      
  //}

});




/****************
 * 
 * 
 * FETCH USER DETAILS FOR LOGGED IN USER
 * 
 * 
 * ************** */


app.get("/userDetails",requireAuth, async function(req,res){

  //console.log(req.session.user);
  if(req.user[0]['user_random'])
  {
      
        let passdata = { perform : 'USER_DETAILS' , performdata : req.user[0]['user_random'] }
        kafka.make_request('users',passdata, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                    
                    /************HANDLE IMAGES AFTER KAFKA RETURN **********/

                  let retM = results['error_type'];
                  console.log(retM);
                  try
                  {
                    let imgMeta = retM["photodata"];
                    if(imgMeta != '')
                    {
                       /*  console.log(JSON.parse(imgMeta));
                        var file = retM["photo"];
                        console.log(file);
    
                        var fileLocation = path.join(__dirname + '/uploads',file);
                        var img = fs.readFileSync(fileLocation);
                        var base64img = new Buffer(img).toString('base64'); */
                        //console.log(base64img);
                        retM["fullBaseIMG"] = retM["photo"]//base64img;
                        //res.send(JSON.stringify({"code":"+1","error_type":retM[0]}));  
                        //callback(null,{"code":"+1","error_type":retM[0]});
                    }
                    else 
                    {
                        retM["fullBaseIMG"] = '';
                        //res.send(JSON.stringify({"code":"+1","error_type":retM[0]}));  
                        ///callback(null,{"code":"+1","error_type":retM[0]});
                    }
    
                  }
                  catch(w)
                  {
                    console.log(w);
                  }
                  
                    results['error_type'] = retM;
                    res.json(results);

                    res.end();
                }
            
        });

      //res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
  }
  else
  {
      res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
  }

});


/****************
 * 
 * 
 * UPDATE PROFILE WITH IMAGE FOR DETAILS PAGE IN THE DASHBOARD
 * 
 * 
 * ************** */

app.post("/updateProfileWithImage", requireAuth, async function(req,res){

    if(req.user[0]['user_random'])
    {
        let uploadError = 0;
        upload(req,res,async function(err) {

            if(err) {
                console.log(err);
                uploadError = -1;
                res.send(JSON.stringify({"code":"-1","error_type":"UPLOAD_ERROR"}));  
            }
            

            let passdata = { perform : 'UPDATE_PROFILE_WITH_IMAGE' , performdata : req.body , sessionid : req.user[0]['user_random'] , files : req.files}
            kafka.make_request('users',passdata, function(err,results){
                console.log('in result');
                console.log(results);
                if (err){
                    console.log("Inside err");
                    res.json("-1")
                }else{
                    console.log("Inside else");
                    console.log(results);
                        res.json(results);            
                        res.end();
                    }                
            });
 
            }
        );
    }
    else 
    {
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));      
    }

});

/****************
 * 
 * 
 * UPDATE PROFILE WITHOUT IMAGE FOR DETAILS PAGE IN THE DASHBOARD
 * 
 * 
 * ************** */

app.post("/updateProfileWithoutImage",requireAuth ,async function(req,res){

    if(req.user[0]['user_random'])
    {
        //console.log("BACKEND--");
        //console.log(req.body);
        let passdata = { perform : 'UPDATE_PROFILE_WITHOUT_IMAGE' , performdata : req.body , sessionid : req.user[0]['user_random']}
        kafka.make_request('users',passdata, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                    res.json(results);

                    res.end();
                }
            
        });
        
    }
    else 
    {
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));
    }

});


/****************
 * 
 * 
 * LOGOUT USER ROUTE AND DESTROY ALL SESSIONS
 * 
 * 
 * ************** */

app.post("/logoutUser",function(req,res){
    console.log("Destroying session and redirecting user to login page.")
    res.clearCookie("user");
    res.clearCookie("trcker");
    res.clearCookie("firstname");
    res.clearCookie("lastname");
    res.clearCookie("isLogged");
    res.clearCookie("login-type");

    
    req.session.destroy();
    res.send("+1");

});



/****************
 * 
 * 
 * WEBSITE SEARCH FILTER
 * 
 * 
 * ************** */
/*******************SEARCH USER DATA ******************/


app.post("/search-data",requireAuth ,async function(req,res){

    res.set({ 'content-type': 'application/json; charset=utf-8' });
    if(req.user[0]['user_random'])
    {
        let passdata = { perform : 'SEARCH_DATA' , performdata : req.body }
        kafka.make_request('searches',passdata, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                    console.log(results['error_type'].length);
                    for(let ls = 0 ; ls < results['error_type'].length ; ls++)
                    {
                        let indImages = results['error_type'][ls]['images'];
                        results['error_type'][ls]["CIM"] = [];
                        for(let lsinner = 0 ; lsinner < indImages.length ; lsinner++)
                        {
                            var file = indImages[lsinner]["path"];
                            /* var fileLocation = path.join(__dirname + '/uploads',file);
                            var img = fs.readFileSync(fileLocation);
                            var base64img = new Buffer(img).toString('base64'); */
                            results['error_type'][ls]["CIM"].push(file);
                        }
                    }
                    res.json(results);

                    res.end();
                }
            
        });
    }
    else 
    {
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));
    }


});


/****************
 * 
 * 
 * ROUTE TO GET PROPERTY PUBLIC PAGE DETAILS
 * 
 * 
 * ************** */


app.get("/getFullPropertyDetails/:givenID",async function(req,res){

     //console.log(req.body.givenID);
     res.set({ 'content-type': 'application/json; charset=utf-8' });
     let passdata = { perform : 'GET_FULL_PROPERTY' , performdata : req.params.givenID }
     kafka.make_request('property',passdata, function(err,results){
         console.log('in result');
         console.log(results);
         if (err){
             console.log("Inside err");
             res.json({
                 status:"error",
                 msg:"System Error, Try Again."
             })
         }else{
             console.log("Inside else");
                let item1 = results['error_type'];
                console.log(item1);
                if(results['error_type'][0]["images"].length == 0)
                {
                    results['error_type'][0]['firstImageData'] = '';
                    
                }
                else 
                {
                    let file = results['error_type'][0]["images"][0]["path"];
                    /* let fileLocation = path.join(__dirname + '/uploads',file);
                    let img = fs.readFileSync(fileLocation);
                    let base64img = new Buffer(img).toString('base64'); */
                    results['error_type'][0]["firstImageData"] = file;
                    results['error_type'][0]["totalImages"] = results['error_type'][0]["images"].length;
                    
                }

                


                /**********IMAGES */
                if(results['error_type'][0]['ownerDetails'][0]["photo"]!='')
                {
                    let file = results['error_type'][0]['ownerDetails'][0]["path"];
                    /* let fileLocation = path.join(__dirname + '/uploads',file);
                    let img = fs.readFileSync(fileLocation);
                    let base64img = new Buffer(img).toString('base64'); */
                    results['error_type'][0]["ownerPhoto"] = file;
                    //res.send(JSON.stringify({"code":"+1","error_type":item1}));  
                    //callback(null,{"code":"+1","error_type":item1})
                }
                else 
                {
                    results['error_type'][0]['ownerPhoto'] = '';
                    //res.send(JSON.stringify({"code":"+1","error_type":item1}));  
                    //callback(null,{"code":"+1","error_type":item1})
                }

                res.json(results);
 
                res.end();
             }
         });
         

});



/****************
 * 
 * 
 * ROUTE TO GET slider IMAGES FROM MONGO
 * 
 * 
 * ************** */

app.post("/getSinglePropertyImage", requireAuth ,async function(req,res){

    res.set({ 'content-type': 'application/json; charset=utf-8' });  
    let currentID = req.body.currentID;
    let currentNumber = req.body.currentImage

    let conditions = { 
        uniqueid : currentID
    };

    try
    {
        let item1 = await executeAsyncQueryMongo(Property,conditions,'find', {images:1,_id:0});
        item1 = JSON.parse(JSON.stringify(item1));
        //console.log(item1);
        item1 = item1[0]["images"];
        item1 = item1[currentNumber]; 
        //console.log(item1);
        //console.log(item1[currentNumber]);
        if(!item1)
        {
            res.send(JSON.stringify({"code":"-1","error_type":[]}));  
        }
        else 
        {
            var file = item1["path"];
            /* var fileLocation = path.join(__dirname + '/uploads',file);
            var img = fs.readFileSync(fileLocation);
            var base64img = new Buffer(img).toString('base64'); */
            let mainObj = [];
            mainObj[0] = {};
            mainObj[0]["firstImageData"] = file;
            res.send(JSON.stringify({"code":"+1","error_type":mainObj}));  
        } 
    }
    catch(e)
    {
        console.log(e);
        res.send(JSON.stringify({"code":"-1","error_type":[]}));  
    }
    
     
});




/****************
 * 
 * 
 * ROUTE TO MAKE BOOKING CONFIRMATION 
 * 
 * 
 * ************** */


app.post("/make-booking", requireAuth , async function(req,res){

    console.log(req.body);
    if(req.user[0]['user_random'])
    {
        let {propertyID,userID,startDate,endDate,guestCount} = req.body;
        console.log(propertyID);
        console.log(userID);
        console.log(startDate);
        console.log(endDate);
        console.log(guestCount);
        let conditions = { 
            $and : [
                { uniqueid : propertyID },
                { startDate: { $lte : startDate }},
                { endDate: { $gte : endDate }},
            ]
        };


        let conditions2 = { 
            $and : [
                { uniqueid : propertyID },
                { 
                    $or : [
                        {
                            $and : [
                                { startBook : { $gte : startDate } },
                                { endBook : { $gte : endDate } },
                                { startBook : { $lte : endDate } }
                            ]
                        },
                        {
                            $and : [
                                { startBook : { $lte : startDate } },
                                { endBook : { $lte : endDate } },
                                { endBook : { $gte : startDate } }
                            ]
                        },
                        {
                            $and : [
                                { startBook : { $gte : startDate } },
                                { endBook : { $gte : endDate } }
                            ]
                        }
                        


                    ]
                }
            ]
        };


    
        try
        {
            let item1 = await executeAsyncQueryMongo(Property,conditions,'find');
            item1 = JSON.parse(JSON.stringify(item1));


            let item2 = await executeAsyncQueryMongo(Property,conditions2,'find');
            item2 = JSON.parse(JSON.stringify(item2));

            console.log(item1.length);
            console.log(item2.length);


            if(item1.length > 0 && item2.length == 0)
            {
                let conditions = { 
                    uniqueid: propertyID
                };
                let conditions2 = { 
                    user_random: userID
                };
                let tt = new Date().getTime() 
                let update_data = {
                        $push : {
                            bookings :[
                              { 
                                  userid : userID ,
                                  startBook : startDate ,
                                  endBook : endDate ,
                                  bookedOn : tt
                              }
                        ]}
                }
                let update_data2 = {
                    $push : {
                        bookings :[
                          { 
                              propertyid : propertyID ,
                              startBook : startDate ,
                              endBook : endDate ,
                              bookedOn : tt
                          }
                    ]}
                }
                /* console.log("FILE IS-------");
                console.log(req.files[0]["filename"]);
                console.log("update data");
                console.log(update_data); */
                let retM3 = await executeAsyncQueryMongo(Property,conditions,'update',update_data);
                console.log(retM3);

                let retM4 = await executeAsyncQueryMongo(Users,conditions2,'update',update_data2);
                console.log(retM4);
                if(retM3)
                {
                    res.send(JSON.stringify({"code":"+1","error_type":"NEW_BOOKING"}));  
                }
                else 
                {
                    res.send(JSON.stringify({"code":"-1","error_type":"PROPERTY_BOOKED"}));  
                }
            }
        }
        catch(e)
        {
            console.log(e);
            res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"})); 
        }
        /****************TABLE PROPERTY CHECK IF RANGE IS ALREADY BOOKED ******************/

        /* let checkForExisting1 =  " SELECT `id` FROM `property` WHERE `uniqueid`='"+propertyID+"' AND ('"+startDate+"'>=`startDate` AND '"+endDate+"'<=`endDate`)";
        console.log(checkForExisting1);
        
        let checkForExisting1R = await executeAsyncQuery(checkForExisting1);
        console.log(checkForExisting1R.length);
        
        let checkForExisting2 =  " SELECT `id` FROM `bookings` WHERE `property_id`='"+propertyID+"' AND (('"+startDate+"'<=`startBook` AND '"+endDate+"'<=`endBook` AND '"+endDate+"'>=`startBook`)  OR ('"+startDate+"'>=`startBook` AND '"+endDate+"'>=`endBook` AND '"+startDate+"'<=`endBook` )   OR ('"+startDate+"'>=`startBook` AND '"+endDate+"'<=`endBook`))";
        console.log(checkForExisting2);

        let checkForExisting2R = await executeAsyncQuery(checkForExisting2);
        console.log(checkForExisting2R.length);
        if(checkForExisting1R.length > 0 && checkForExisting2R.length == 0)
        {
            let insertQuery = " INSERT INTO `bookings`(`id`, `property_id`, `user_id`, `startBook`, `endBook`, `bookedOn`, `ex1`, `ex2`) VALUES (NULL,'"+propertyID+"','"+userID+"','"+startDate+"','"+endDate+"','"+new Date().getTime()+"','','') ";
            console.log(insertQuery);
            let item1 = await executeAsyncQuery(insertQuery);
            res.send(JSON.stringify({"code":"+1","error_type":"NEW_BOOKING"}));  
        }
        else 
        {
            res.send(JSON.stringify({"code":"-1","error_type":"PROPERTY_BOOKED"}));  
        } */

        
    }
    else
    {
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
    }

});



/****************
 * 
 * 
 * ROUTE TO GET ALL SELLER BOOKINGS
 * 
 * 
 * ************** */


app.get("/seller-bookings",requireAuth ,async function(req,res){

    res.set({ 'content-type': 'application/json; charset=utf-8' });
    //console.log("USER ID "+ req.session.user);
    if(req.user[0]['user_random'])
    {  
        let passdata = { perform : 'SELLER_BOOKINGS' , performdata : req.user[0]['user_random'] };
        kafka.make_request('searches',passdata, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                console.log(results);
                //let query1= results['error_type'][0];

                res.json(results);
                res.end();
            }
            
        });
    }
    else 
    {   
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
    }

});





/****************
 * 
 * 
 * ROUTE TO GET TRAVELLER BOOKINGS
 * 
 * 
 * ************** */


app.get("/traveller-bookings", requireAuth,async function(req,res){

    if(req.user[0]['user_random'])
    {
        let passdata = { perform : 'TRAVELLER_BOOKINGS' , performdata : req.user[0]['user_random']};
        kafka.make_request('searches',passdata, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                console.log(results);
                //let query1= results['error_type'][0];

                res.json(results);
                res.end();
            }
            
        });
    }
    else 
    {   
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
    }

});




/****************
 * 
 * 
 * ROUTE TO GET PUBLIC PROFILE PAGE DETAILS OF USER ( SELLER AND TRAVELLER)
 * 
 * 
 * ************** */

app.get("/public-profiles/:id",async function(req,res){

    res.set({ 'content-type': 'application/json; charset=utf-8' });
    let passdata = { perform : 'PUBLIC_PROFILES' , performdata : req.params.id }
    kafka.make_request('users',passdata, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            console.log(results);
            let query1= results['error_type'][0];
            console.log(query1);
            try
            {
                if(query1["photo"]!="")
                {
                    var file = query1["photo"];
                    /* var fileLocation = path.join(__dirname + '/uploads',file);
                    var img = fs.readFileSync(fileLocation);
                    var base64img = new Buffer(img).toString('base64'); */
                    query1["CIM"] = file;
                    results['error_type'][0] = query1;
                    res.send(JSON.stringify(results));
                }
                else 
                {
                    query1["CIM"] = "";
                    results['error_type'][0] = query1;
                    res.send(JSON.stringify(results));  
                }
                
            }
            catch(e)
            {
                query1["CIM"] = "";
                console.log(e);
                results['error_type'][0] = query1;
                res.send(JSON.stringify(results));
            }



               // res.json(results);

                res.end();
            }
        
    });

});


app.post('/protectedRoute', requireAuth, function (request, response) {
    //console.log(requireAuth);
    console.log("CALLING PROTECTED ROUTE");
    console.log(request.user);
    console.log("USER RANDOM");
    //console.log(request);
    
    //response.send('Your User id is: ' + request.user.id + ', username is: ' + request.user.username + '.');
    response.send("+1");
});



/****************
 * 
 * 
 * ROUTE TO SAVE ASKED QUESTION
 * 
 * 
 * ************** */

 app.post('/ask-a-question',requireAuth , async function(request,response){

        response.set({ 'content-type': 'application/json; charset=utf-8' });
        console.log("CALLING ASK A QUESTION ROUTE");
        console.log(request.user);
        
        if(request.user[0]['user_random']!='')
        {
            
        let passdata = { perform : 'ASK_QUESTION' , performdata : request.body , userid : request.user[0]['user_random']};
        kafka.make_request('users',passdata, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                response.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else{
                console.log("Inside else");
                    
                    
                response.json(results);

                    response.end();
                }
            
        });
      

        /*********************************************************************** */

    }
    else 
    {
        response.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
    }

 });






/****************
 * 
 * 
 * ROUTE TO GET QUESTIONS OF USERS
 * 
 * 
 * ************** */
//CHECK FOR BOTH TYPES OF USERS IF THE CODE IS RETURNING THE CORRECT DATA

app.post("/get-questions",requireAuth,async function(request,response){

    response.set({ 'content-type': 'application/json; charset=utf-8' });
    if(request.user[0]['user_random']!='')
    {
        let userType = request.body.usertype;
        let userid = request.user[0]["user_random"];


            let passdata = { perform : 'GET_QUESTIONS' ,  userid : request.user[0]['user_random'] , userType : request.body.usertype};
            kafka.make_request('users',passdata, function(err,results){
                console.log('in result');
                console.log(results);
                if (err){
                    console.log("Inside err");
                    response.json({
                        status:"error",
                        msg:"System Error, Try Again."
                    })
                }else{
                    console.log("Inside else");
                        console.log(results.error_type.details);
                        
                             /******************image changes ********************/
                                    let retM = results.error_type.details;
                                    for(let ls = 0 ; ls < retM.length ; ls++)
                                    {
                                        if(Object.keys(retM[ls]).indexOf("images")!=-1)
                                        {
                                            if(retM[ls]["images"].length == 0)
                                            {
                                                retM[ls]["CIM"] = [];
                                            }
                                            else 
                                            {
                                                retM[ls]["CIM"] = [];
                                                for(let lsinner = 0 ; lsinner < retM[ls]["images"].length ; lsinner++)
                                                {

                                                    var file = retM[ls]["images"][lsinner]["path"];
                                                    /* console.log(file);
                                                    var fileLocation = path.join(__dirname + '/uploads',file);
                                                    var img = fs.readFileSync(fileLocation);
                                                    var base64img = new Buffer(img).toString('base64'); */
                                                    retM[ls]["CIM"].push(file);
                                                }
                                            }
                                        }
                                    }

                                    results.error_type.details = retM;
                                    response.json(results);

                                /*************************************************** */
                        
                        
    
                        response.end();
                    }
                
            });    
            

    }   
    else 
    {
        response.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
    }

});







/****************
 * 
 * 
 * ROUTE TO UPDATE ANSWERS FROM THE SELLER
 * 
 * 
 * ************** */
//CHECK FOR BOTH TYPES OF USERS IF THE CODE IS RETURNING THE CORRECT DATA

app.post("/save-answers",requireAuth,async function(request,response){

    response.set({ 'content-type': 'application/json; charset=utf-8' });
    if(request.user[0]['user_random']!='')
    {
            let passdata = { perform : 'SAVE_QUESTION' , performdata : request.body};
            kafka.make_request('users',passdata, function(err,results){
                console.log('in result');
                console.log(results);
                if (err){
                    console.log("Inside err");
                    response.json({
                        status:"error",
                        msg:"System Error, Try Again."
                    });
                }else{
                    console.log("Inside else");
                        
                        
                    response.json(results);

                        response.end();
                    }
                
            });
      
    }
    else 
    {
        response.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
    }

});


module.exports = app;
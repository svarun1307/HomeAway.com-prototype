//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });
var mysql = require('mysql');
var dbconn = require('./db');
var helper = require('./helper');
const mime = require('mime');
const uuidv1 = require('uuid/v1');
var validator = require('validator');
const path = require('path');
const fs = require('fs');
/************BCRYPT SETTINGS ************/
const bcrypt = require('bcrypt');
const saltRounds = 10;
  

//console.log(dbconn);
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json({limit: 524288000}));
app.use(bodyParser.urlencoded({limit: 524288000, extended: true}));
//app.use(bodyParser.json({limit : '50mb'}));


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'lab1_64_homeaway_app',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

//app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });



  /**********MULTER SETTINGS ***************/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {      
      cb(null, Date.now() + '.' + mime.getExtension(file.mimetype)); //Appending .jpg
    },
    limits: { fieldSize: 25 * 1024 * 1024 }
});
var upload = multer({ storage : storage }).array('uploadSelect',5); 



async function executeAsyncQuery(q){

    return new Promise(function(resolve, reject) {
        dbconn.query(q,function(err,response,fields){
            console.log(response);
            if(err)
            {
                reject(err);
            }
            else 
            {
                resolve(response);
            }
        });
    });
} 

var getAllImagesOfProperty = function(y){
  console.log(y);
  let imageArray = [];
  let s = " SELECT * FROM `property_images` WHERE `property_id`='"+y+"' AND `name`!='' ";
  console.log(s);
  dbconn.query(s,function(err,response,fields){
      if(err)
      {
          imageArray = [];
          return imageArray;
      }
      else
      {
          console.log(response);
          let o = response.length;
          for(var m = 0 ;  m < o ; m++)
          {
              try
              {
                  var file = response[m]["path"];
                  console.log(file);
                  var fileLocation = path.join(__dirname + '/uploads',file);
                  var img = fs.readFileSync(fileLocation);
                  var base64img = new Buffer(img).toString('base64');
                  //console.log(base64img);
                  imageArray[m] = base64img;
              }
              catch(w)
              {
                imageArray[m] = '';
                console.log(w);
              }
          }
          return imageArray;
      }

    });

}



app.get("/",function(req,res){
    console.log("tes");
    res.send("-1");

});


/*******************OWNER POST PROPERTY *****************/
app.post('/addProperty',  function (req, res, next) {

  if(req.session.user)
  {
      let uploadError = 0;
      upload(req,res,function(err) {
        if(err) {
            uploadError = -1;
            res.send("-1");
        }
        if(uploadError == 0)
        {
            //console.log(req.files);
            let _m = req.body;
            let currentTime = Date.now();
            let currentPropID = uuidv1();
            let user_id = req.session.user;
            let insertQuery = 'INSERT INTO `property`(`id`, `uniqueid`, `location`, `headline`, `propdesc`, `type`, `bedrooms`, `accomodates`, `bathrooms`, `photocount`, `startDate`, `endDate`, `currency`, `nights`, `baseRate`, `userid`, `username`, `timeadded`, `ex1`, `ex2`, `ex3`, `ex4`, `ex5`) VALUES (NULL,"'+currentPropID+'","'+_m["placeLocation"]+'","'+_m["propHeadLine"]+'","'+_m["propdesc"]+'","'+_m["propType"]+'","'+_m["propbedRooms"]+'","'+_m["propbedaccom"]+'","'+_m["propbathrooms"]+'","'+req.files.length+'","'+_m["initDate"]+'","'+_m["finalDate"]+'","'+_m["currency"]+'","'+_m["propminstay"]+'","'+_m["propnightly"]+'","'+user_id+'","","'+currentTime+'","'+_m["propAmenities"]+'","'+_m["propArea"]+'","","","")';
            //console.log(insertQuery);
            dbconn.query(insertQuery, function(err, rows, fields) {
              if (!err)
              {
                  for(var k=0; k < req.files.length ; k++)
                  {
                    console.log("adding files here to the file code");
                    let fileUploadQuery = "INSERT INTO `property_images`(`id`, `user_id`, `property_id`, `name`, `path`, `time`, `ex1`) VALUES (NULL,'"+user_id+"','"+currentPropID+"','"+req.files[k]['originalname']+"','"+req.files[k]['filename']+"','"+currentTime+"','"+JSON.stringify(req.files[k])+"')";
                    dbconn.query(fileUploadQuery,function(err,rows,fields){});
                  }
                  //console.log('The solution is: ', rows);
                  res.send("+1");
              }
              else
              {
                  //console.log('Error while performing Query.' + err);
                  res.send("-1");
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


/*****************USER LOGIN VALIDTION************** */

app.post("/login-validate",function(req,res){
    
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
  }
  
  //res.send("-1");

});



/***************SELLER SIGNUP**************** */

app.post("/user-signup",function(req,res){

  res.set({ 'content-type': 'application/json; charset=utf-8' });
  console.log(req.body);
  let {firstnames,lastnames,signupemails,signuppassword,loginType} = req.body;

  if(firstnames.trim()=='' || lastnames.trim()=='')
  {
      res.send(JSON.stringify({"code":"-1","error_type":"NAMES_ERROR"}));
  }
  else if(!validator.isEmail(signupemails))
  {
      res.send(JSON.stringify({"code":"-1","error_type":"EMAIL_ERROR"}));
  }
  else if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g).test(signuppassword))
  {
      res.send(JSON.stringify({"code":"-1","error_type":"PASSWORD_ERROR"}));
  }
  else 
  {
      //***********CHECK IF EMAIL ALREADY EXISTS **************/

      let CheckingQuery = " SELECT * FROM `users` WHERE `email`='"+signupemails+"' AND `acctype`='"+loginType+"' ";
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
      });

      
  }


});


app.get("/userDetails",function(req,res){

  //console.log(req.session.user);
  if(req.session.user)
  {
      let conQ = " SELECT * FROM `users` WHERE `user_random`='"+req.session.user+"' ";
      dbconn.query(conQ,function(err,row,fields){
        if(!err)
        {
            if(row.length == 0)
            {
              res.send(JSON.stringify({"code":"-1","error_type":"NO_USER"}));  
            }
            else if(row.length == 1)
            {
              console.log(row);
              delete row[0]["ex2"];
              for(var i = 0 ; i < Object.keys(row[0]).length ; i++)
              {
                let k = Object.keys(row[0])[i];
                //console.log(k);
                let v = row[0][k];
                //console.log(v);
                v = v + "";
                if(v[0]=="'" && v[v.length-1]=="'")
                  row[0][k] = v.substring(1, v.length - 1);
              }

              /************Add Image to the response *****************/

              try
              {
                let imgMeta = row[0]["photodata"];
                if(imgMeta != '')
                {
                    console.log(JSON.parse(imgMeta));
                    var file = row[0]["photo"];
                    var fileLocation = path.join(__dirname + '/uploads',file);
                    var img = fs.readFileSync(fileLocation);
                    var base64img = new Buffer(img).toString('base64');
                    //console.log(base64img);
                    row[0]["fullBaseIMG"] = base64img;
                }
                else 
                {
                    row[0]["fullBaseIMG"] = '';
                }

              }
              catch(w)
              {
                console.log(w);
              }
              
              //res.writeHead(200, {'Content-Type': 'image/jpg' });
              //res.end(base64img);


              res.send(JSON.stringify({"code":"+1","error_type":row[0]}));  
            }
            else 
            {
              res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
            }
        }
        else 
        {
            res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));       
        }
      });

      //res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
  }
  else
  {
      res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
  }
});


app.post("/updateProfileWithImage",function(req,res){

    if(req.session.user)
    {
  let uploadError = 0;

  upload(req,res,function(err) {

    if(err) {
        console.log(err);
        uploadError = -1;
        res.send(JSON.stringify({"code":"-1","error_type":"UPLOAD_ERROR"}));  
    }
    //if(uploadError == 0)
    //{
        let _m = req.body;
        let updateQuery = 'UPDATE `users` SET `name`="'+dbconn.escape(_m["userFname"])+'",`phone`="'+dbconn.escape(_m["textmask"])+'",`about`="'+dbconn.escape(_m["userabout"])+'",`city`="'+dbconn.escape(_m["userCity"])+'",`country`="'+dbconn.escape(_m["userCountry"])+'",`company`="'+dbconn.escape(_m["userCompany"])+'",`school`="'+dbconn.escape(_m["userSchool"])+'",`hometown`="'+dbconn.escape(_m["userHometown"])+'",`languages`="'+dbconn.escape(_m["userLang"])+'",`gender`="'+_m["gender"]+'",`photo`="'+req.files[0]["filename"]+'",`photodata`=\''+JSON.stringify(req.files[0])+'\',`ex1`="'+dbconn.escape(_m["userLname"])+'" WHERE `user_random`="'+req.session.user+'"';
        console.log(updateQuery);
        dbconn.query(updateQuery,function(err,row,fields){
          if(!err)
          {
            res.send(JSON.stringify({"code":"+1","error_type":"SUCC"}));  
          }
          else 
          {
            res.send(JSON.stringify({"code":"-1","error_type":"UPDATE_ERROR"}));  
          }
        })
    }
    
    /* ß */
    //res.send("-1");
  );
    }
    else 
    {
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));      
    }

});


app.post("/updateProfileWithoutImage",function(req,res){

    if(req.session.user)
    {
        let _n = req.body;
        //console.log(_n);
        let _m = helper.hps(dbconn,_n);
        //console.log(_m);
        //sconsole.log(_m["userabout"]);
        let updateQuery = 'UPDATE `users` SET `name`="'+dbconn.escape(_m["userFname"])+'",`phone`="'+dbconn.escape(_m["textmask"])+'",`about`="'+dbconn.escape(_m["userabout"])+'",`city`="'+dbconn.escape(_m["userCity"])+'",`country`="'+dbconn.escape(_m["userCountry"])+'",`company`="'+dbconn.escape(_m["userCompany"])+'",`school`="'+dbconn.escape(_m["userSchool"])+'",`hometown`="'+dbconn.escape(_m["userHometown"])+'",`languages`="'+dbconn.escape(_m["userLang"])+'",`gender`="'+_m["gender"]+'",`ex1`="'+dbconn.escape(_m["userLname"])+'" WHERE `user_random`="'+req.session.user+'"';
        console.log(updateQuery);
        dbconn.query(updateQuery,function(err,row,fields){
          if(!err)
          {
            res.send(JSON.stringify({"code":"+1","error_type":"SUCC"}));  
          }
          else 
          {
            res.send(JSON.stringify({"code":"-1","error_type":"UPDATE_ERROR"}));  
          }
        })
    }
    else 
    {
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));
    }
});


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


/*******************SEARCH USER DATA ******************/


app.post("/search-data",async function(req,res){

  let {guests,whereTo,fromTo,fromTo2} = req.body;
  console.log(new Date(fromTo).getTime());
  let sTIME = new Date(req.body.fromTo).getTime();
  let eTIME = new Date(req.body.fromTo2).getTime();
  console.log(sTIME+"--"+eTIME);


    let initalFilter = " SELECT * FROM `property` WHERE `location` LIKE '%"+whereTo+"%' AND  `uniqueid`!='' AND `accomodates`>='"+guests+"' AND `startDate`<='"+sTIME+"' AND `endDate`>='"+eTIME+"' "; 
    
    console.log(initalFilter);
    let propertyImages = [];
    try
    {
        let item1 = await executeAsyncQuery(initalFilter);
        //console.log(item1);
        for(let ls = 0 ; ls < item1.length ; ls++)
        {
            let propID = item1[ls]['uniqueid'];
            let indImagesQuery = " SELECT * FROM `property_images` WHERE `property_id`='"+propID+"' AND `name`!='' ";
            let indImages = await executeAsyncQuery(indImagesQuery);
            console.log(propID+"-------------------");
            console.log(indImages);
            if(indImages.length == 0)
            {
                item1[ls]["CIM"] = [];
            }
            else 
            {
                item1[ls]["CIM"] = [];
                for(let lsinner = 0 ; lsinner < indImages.length ; lsinner++)
                {
                    var file = indImages[lsinner]["path"];
                    var fileLocation = path.join(__dirname + '/uploads',file);
                    var img = fs.readFileSync(fileLocation);
                    var base64img = new Buffer(img).toString('base64');
                    item1[ls]["CIM"].push(base64img);
                }
            }
        }
        //console.log("------FINAL-------");
        if(item1.length==0)
            item1 = [];
        res.send(JSON.stringify({"code":"+1","error_type":item1}));
    }
    catch(e)
    {
        console.log("ERROR",e);
        res.send(JSON.stringify({"code":"-1","error_type":"DB_ERROR"}));  
    }
    
});

app.get("/getFullPropertyDetails/:givenID",async function(req,res){

    //console.log(req.body.givenID);
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    console.log(req.session.user);
    let idx = req.params.givenID;
    let s = " SELECT * FROM `property` WHERE `uniqueid`='"+idx+"' ";
    let getFirstImage =  " SELECT * FROM `property_images` WHERE `property_id`='"+idx+"' ORDER BY `id` ASC ";
    
    console.log(s);

    try
    {
        let item1 = await executeAsyncQuery(s);
        let item2 = await executeAsyncQuery(getFirstImage);
        let userid = item1[0]["userid"];
        let getOwnerDetails = " SELECT `name`,`email`,`languages`,`joinedon`,`photo`,`photodata`,`ex1` FROM `users` WHERE `acctype`='SELLER' and `user_random`='"+userid+"' ";
        console.log(getOwnerDetails);
        let item3 = await executeAsyncQuery(getOwnerDetails);
        if(item2.length == 0)
        {
            item1[0]['firstImageData'] = '';
            
        }
        else 
        {
            let file = item2[0]["path"];
            let fileLocation = path.join(__dirname + '/uploads',file);
            let img = fs.readFileSync(fileLocation);
            let base64img = new Buffer(img).toString('base64');
            item1[0]["firstImageData"] = base64img;
            item1[0]["totalImages"] = item2.length;
            
        }
        

        //*************get user image ***************/
        item3[0]['userid'] = userid;
        item1[0]['ownerDetails'] = item3;
        if(item3[0]["photo"]!='')
        {
            let file = item3[0]["path"];
            let fileLocation = path.join(__dirname + '/uploads',file);
            let img = fs.readFileSync(fileLocation);
            let base64img = new Buffer(img).toString('base64');
            item1[0]["ownerPhoto"] = base64img;
            res.send(JSON.stringify({"code":"+1","error_type":item1}));  
        }
        else 
        {
            item1[0]['ownerPhoto'] = '';
            res.send(JSON.stringify({"code":"+1","error_type":item1}));  
        }
        
    }
    catch(e)
    {
        console.log("ERROR",e);
        res.send(JSON.stringify({"code":"-1","error_type":"DB_ERROR"}));  
    }


});


app.post("/getSinglePropertyImage",function(req,res){

    res.set({ 'content-type': 'application/json; charset=utf-8' });  
  let currentID = req.body.currentID;
  let currentNumber = req.body.currentImage
  let getFirstImage =  " SELECT * FROM `property_images` WHERE `property_id`='"+currentID+"' ORDER BY `id` ASC LIMIT "+currentNumber+",1 ";
  console.log(getFirstImage);
  dbconn.query(getFirstImage,function(err2,response2,fields2){
              if(response2.length==0)
              {
                  //response[0]["firstImageData"] = '';
                  res.send(JSON.stringify({"code":"-1","error_type":[]}));  
              }
              else 
              {
                  var file = response2[0]["path"];
                  var fileLocation = path.join(__dirname + '/uploads',file);
                  var img = fs.readFileSync(fileLocation);
                  var base64img = new Buffer(img).toString('base64');
                  let mainObj = [];
                  mainObj[0] = {};
                  mainObj[0]["firstImageData"] = base64img;
                  res.send(JSON.stringify({"code":"+1","error_type":mainObj}));  
              }                         

  });

});


app.post("/make-booking",async function(req,res){

    console.log(req.body);
    if(req.session.user)
    {
        let {propertyID,userID,startDate,endDate,guestCount} = req.body;


        /****************TABLE PROPERTY CHECK IF RANGE IS ALREADY BOOKED ******************/

        let checkForExisting1 =  " SELECT `id` FROM `property` WHERE `uniqueid`='"+propertyID+"' AND ('"+startDate+"'>=`startDate` AND '"+endDate+"'<=`endDate`)";
        console.log(checkForExisting1);
        
        let checkForExisting1R = await executeAsyncQuery(checkForExisting1);
        console.log(checkForExisting1R.length);
        /****************TABLE PROPERTY CHECK IF RANGE IS EVEN MET ******************/
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
        }

        
    }
    else
    {
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
    }

});


/* app.get("/traveller-bookings",async function(req,res){

    if(req.session.user)
    {
        let sql1 = " SELECT * FROM `property` WHERE `user_id`='"+req.session.user+"' ";
        console.log(sql1);
        try
        {
            let item1 = await executeAsyncQuery(sql1);
            //console.log(item1);
            for(let ls = 0 ; ls < item1.length ; ls++)
            {
                let propID = item1[ls]['uniqueid'];
                let indImagesQuery = " SELECT * FROM `property_images` WHERE `property_id`='"+propID+"' AND `name`!='' ";
                let indImages = await executeAsyncQuery(indImagesQuery);
                console.log(propID+"-------------------");
                console.log(indImages);
                if(indImages.length == 0)
                {
                    item1[ls]["CIM"] = [];
                }
                else 
                {
                    item1[ls]["CIM"] = [];
                    for(let lsinner = 0 ; lsinner < indImages.length ; lsinner++)
                    {
                        var file = indImages[lsinner]["path"];
                        var fileLocation = path.join(__dirname + '/uploads',file);
                        var img = fs.readFileSync(fileLocation);
                        var base64img = new Buffer(img).toString('base64');
                        item1[ls]["CIM"].push(base64img);
                    }
                }
            }
            //console.log("------FINAL-------");
            if(item1.length==0)
                item1 = [];
            res.send(JSON.stringify({"code":"+1","error_type":item1}));
        }
        catch(e)
        {
            console.log("ERROR",e);
            res.send(JSON.stringify({"code":"-1","error_type":"DB_ERROR"}));  
        }
    }
    else 
    {   
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
    }

});
 */


app.get("/seller-bookings",async function(req,res){

    if(req.session.user)
    {
        let sql1 = " SELECT p.*,b.* FROM `property` p INNER JOIN `bookings` b ON b.`property_id`=p.`uniqueid` WHERE p.`userid`='"+req.session.user+"' ";
        
        //" SELECT * FROM `property` WHERE `userid`='"+req.session.user+"' ";
        console.log(sql1);
        try
        {
            let item1 = await executeAsyncQuery(sql1);
            //console.log(item1);
            for(let ls = 0 ; ls < item1.length ; ls++)
            {
                let propID = item1[ls]['uniqueid'];
                let indImagesQuery = " SELECT * FROM `property_images` WHERE `property_id`='"+propID+"' AND `name`!='' ";
                let indImages = await executeAsyncQuery(indImagesQuery);
                console.log(propID+"-------------------");
                console.log(indImages);
                if(indImages.length == 0)
                {
                    item1[ls]["CIM"] = [];
                }
                else 
                {
                    item1[ls]["CIM"] = [];
                    for(let lsinner = 0 ; lsinner < indImages.length ; lsinner++)
                    {
                        var file = indImages[lsinner]["path"];
                        var fileLocation = path.join(__dirname + '/uploads',file);
                        var img = fs.readFileSync(fileLocation);
                        var base64img = new Buffer(img).toString('base64');
                        item1[ls]["CIM"].push(base64img);
                    }
                }
            }
            //console.log("------FINAL-------");
            if(item1.length==0)
                item1 = [];
            res.send(JSON.stringify({"code":"+1","error_type":item1}));
        }
        catch(e)
        {
            console.log("ERROR",e);
            res.send(JSON.stringify({"code":"-1","error_type":"DB_ERROR"}));  
        }
    }
    else 
    {   
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
    }

});



app.get("/traveller-bookings",async function(req,res){

    if(req.session.user)
    {
        let sql1 =  " SELECT p.*,b.* FROM `property` p INNER JOIN `bookings` b ON b.`property_id`=p.`uniqueid` WHERE b.`user_id`='"+req.session.user+"' ";
        
        //" SELECT * FROM `bookings` WHERE `user_id`='"+req.session.user+"' "
        
        //" SELECT * FROM `property` WHERE `userid`='"+req.session.user+"' ";
        console.log(sql1);
        try
        {
            let item1 = await executeAsyncQuery(sql1);
            //console.log(item1);
            for(let ls = 0 ; ls < item1.length ; ls++)
            {
                let propID = item1[ls]['property_id'];
                let indImagesQuery = " SELECT * FROM `property_images` WHERE `property_id`='"+propID+"' AND `name`!='' ";
                let indImages = await executeAsyncQuery(indImagesQuery);
                console.log(propID+"-------------------");
                console.log(indImages);
                if(indImages.length == 0)
                {
                    item1[ls]["CIM"] = [];
                }
                else 
                {
                    item1[ls]["CIM"] = [];
                    for(let lsinner = 0 ; lsinner < indImages.length ; lsinner++)
                    {
                        var file = indImages[lsinner]["path"];
                        var fileLocation = path.join(__dirname + '/uploads',file);
                        var img = fs.readFileSync(fileLocation);
                        var base64img = new Buffer(img).toString('base64');
                        item1[ls]["CIM"].push(base64img);
                    }
                }
            }
            //console.log("------FINAL-------");
            if(item1.length==0)
                item1 = [];
            res.send(JSON.stringify({"code":"+1","error_type":item1}));
        }
        catch(e)
        {
            console.log("ERROR",e);
            res.send(JSON.stringify({"code":"-1","error_type":"DB_ERROR"}));  
        }
    }
    else 
    {   
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
    }

});


app.get("/public-profiles/:id",async function(req,res){

    res.set({ 'content-type': 'application/json; charset=utf-8' });
    let userID = req.params.id;
    let query = " SELECT * FROM `users` WHERE `user_random`='"+userID+"'  ";
    let query1 = await executeAsyncQuery(query);
    console.log(query);
    
    if(query1.length==1)
    {
        delete query1[0]["ex2"];
        for(var i = 0 ; i < Object.keys(query1[0]).length ; i++)
        {
          let k = Object.keys(query1[0])[i];
          //console.log(k);
          let v = query1[0][k];
          //console.log(v);
          v = v + "";
          if(v[0]=="'" && v[v.length-1]=="'")
            query1[0][k] = v.substring(1, v.length - 1);
        }
        console.log(query1);
        try
        {
            if(query1[0]["photo"]!="")
            {
                var file = query1[0]["photo"];
                var fileLocation = path.join(__dirname + '/uploads',file);
                var img = fs.readFileSync(fileLocation);
                var base64img = new Buffer(img).toString('base64');
                query1[0]["CIM"] = base64img;
                
                res.send(JSON.stringify({"code":"+1","error_type": query1}));  
            }
            else 
            {
                query1[0]["CIM"] = "";
                
                res.send(JSON.stringify({"code":"+1","error_type": query1}));  
            }
            
        }
        catch(e)
        {
            query1[0]["CIM"] = "";
            console.log(e);
            
            res.send(JSON.stringify({"code":"+1","error_type": query1}));  
        }
    
    }
    else if(query1.length==0)
    {
        
        res.send(JSON.stringify({"code":"-1","error_type":"NO_USER"}));  
    }
    else 
    {
        
        res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
    }

});


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");


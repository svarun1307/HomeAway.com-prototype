//import the require dependencies

var bodyParser = require('body-parser');

/*************************************************/
const {mongoose,jwtsecret} = require('../mongoose/mongoose');
var {Users} = require('../models/users');
var {Property} = require('../models/property');
var db = mongoose.connection;

const executeAsyncQueryMongo  = require('../mongoose/trigger.js');


async function handle_request(msg, callback){

    
    console.log(msg.perform);
   
    console.log("Inside book kafka backend SIGNUP");
    console.log(msg);
    if(msg.perform == 'UPDATE_PROFILE_WITH_IMAGE' )
    {

        let _m = msg.performdata;//req.body;

        let conditions = { 
            user_random: msg.sessionid//req.session.user 
        };
        let update_data = {
            name : _m["userFname"],
            phone : _m["textmask"],
            about : _m["userabout"],
            city : _m["userCity"],
            country : _m["userCountry"],
            company : _m["userCompany"],
            school : _m["userSchool"],
            hometown : _m["userHometown"],
            languages : _m["userLang"],
            gender : _m["gender"],
            ex1 : _m["userLname"],
            photo : msg.files[0]["location"],
            photodata : JSON.stringify(msg.files[0])
        }
        /* console.log("FILE IS-------");
        console.log(req.files[0]["filename"]);
        console.log("update data");
        console.log(update_data); */
        let retM = await executeAsyncQueryMongo.executeAsyncQueryMongo(Users,conditions,'update',update_data);
        console.log(retM);
        if(retM)
        {
            //res.send(JSON.stringify({"code":"+1","error_type":"SUCC"}));  
            callback(null,{"code":"+1","error_type":"SUCC"});
        }
        else 
        {
            //res.send(JSON.stringify({"code":"-1","error_type":"UPDATE_ERROR"}));    
            callback(null,{"code":"-1","error_type":"UPDATE_ERROR"});
        }

       /*  let updateQuery = 'UPDATE `users` SET `name`="'+dbconn.escape(_m["userFname"])+'",`phone`="'+dbconn.escape(_m["textmask"])+'",`about`="'+dbconn.escape(_m["userabout"])+'",`city`="'+dbconn.escape(_m["userCity"])+'",`country`="'+dbconn.escape(_m["userCountry"])+'",`company`="'+dbconn.escape(_m["userCompany"])+'",`school`="'+dbconn.escape(_m["userSchool"])+'",`hometown`="'+dbconn.escape(_m["userHometown"])+'",`languages`="'+dbconn.escape(_m["userLang"])+'",`gender`="'+_m["gender"]+'",`photo`="'+req.files[0]["filename"]+'",`photodata`=\''+JSON.stringify(req.files[0])+'\',`ex1`="'+dbconn.escape(_m["userLname"])+'" WHERE `user_random`="'+req.session.user+'"';
        console.log(updateQuery); */
        /* dbconn.query(updateQuery,function(err,row,fields){
        if(!err)
        {
            res.send(JSON.stringify({"code":"+1","error_type":"SUCC"}));  
        }
        else 
        {
            res.send(JSON.stringify({"code":"-1","error_type":"UPDATE_ERROR"}));  
        }
        }) */
    }
    else if(msg.perform == 'UPDATE_PROFILE_WITHOUT_IMAGE' )
    {
        //let _n = req.body;
        //console.log(_n);
        let _m = msg.performdata;
        console.log("DATA FR UPDATE WITHOUT PROFILE IMAGE-.-.-..-.-");
        console.log(_m);
        //sconsole.log(_m["userabout"]);

        let conditions = { 
            user_random: msg.sessionid
        };
        let update_data = {
            name : _m["userFname"],
            phone : _m["textmask"],
            about : _m["userabout"],
            city : _m["userCity"],
            country : _m["userCountry"],
            company : _m["userCompany"],
            school : _m["userSchool"],
            hometown : _m["userHometown"],
            languages : _m["userLang"],
            gender : _m["gender"],
            ex1 : _m["userLname"]
        }
        console.log("update data");
        console.log(update_data);
        let retM = await executeAsyncQueryMongo.executeAsyncQueryMongo(Users,conditions,'update',update_data);
        console.log(retM);
        console.log(typeof retM);
        if(retM)
        {
            //res.send(JSON.stringify({"code":"+1","error_type":"SUCC"}));  
            callback(null,{"code":"+1","error_type":"SUCC"});
        }
        else 
        {
            //res.send(JSON.stringify({"code":"-1","error_type":"UPDATE_ERROR"}));  
            callback(null,{"code":"-1","error_type":"UPDATE_ERROR"});
        }   
        
       /*  let updateQuery = 'UPDATE `users` SET `name`="'+dbconn.escape(_m["userFname"])+'",`phone`="'+dbconn.escape(_m["textmask"])+'",`about`="'+dbconn.escape(_m["userabout"])+'",`city`="'+dbconn.escape(_m["userCity"])+'",`country`="'+dbconn.escape(_m["userCountry"])+'",`company`="'+dbconn.escape(_m["userCompany"])+'",`school`="'+dbconn.escape(_m["userSchool"])+'",`hometown`="'+dbconn.escape(_m["userHometown"])+'",`languages`="'+dbconn.escape(_m["userLang"])+'",`gender`="'+_m["gender"]+'",`ex1`="'+dbconn.escape(_m["userLname"])+'" WHERE `user_random`="'+req.session.user+'"';
        console.log(updateQuery); */
        /* dbconn.query(updateQuery,function(err,row,fields){
          if(!err)
          {
            res.send(JSON.stringify({"code":"+1","error_type":"SUCC"}));  
          }
          else 
          {
            res.send(JSON.stringify({"code":"-1","error_type":"UPDATE_ERROR"}));  
          }
        }) */

    }
         
  
}


module.exports.handle_request = handle_request;
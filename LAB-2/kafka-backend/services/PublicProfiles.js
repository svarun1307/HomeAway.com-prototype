//import the require dependencies

var bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
/*************************************************/
const {mongoose,jwtsecret} = require('../mongoose/mongoose');
var {Users} = require('../models/users');
var {Property} = require('../models/property');
var db = mongoose.connection;

const executeAsyncQueryMongo  = require('../mongoose/trigger.js');


async function handle_request(msg, callback){

    console.log(msg.perform);
    console.log("Inside book kafka backend PUBLIC_PROFILES");
    console.log(msg);
    if(msg.perform == 'PUBLIC_PROFILES' )
    {
        let userID = msg.performdata;
        //let query = " SELECT * FROM `users` WHERE `user_random`='"+userID+"'  ";
        //let query1 = await executeAsyncQuery(query);
    
        let conditions = {  
                user_random: userID
        };
    
        let query1a = await executeAsyncQueryMongo.executeAsyncQueryMongo(Users,conditions,'find');
        console.log(query1a);
        let query1 = JSON.parse(JSON.stringify(query1a));
        if(query1.length==1)
        {
            delete query1[0]["ex2"];
            /* for(var i = 0 ; i < Object.keys(query1[0]).length ; i++)
            {
              let k = Object.keys(query1[0])[i];
              //console.log(k);
              let v = query1[0][k];
              //console.log(v);
              v = v + "";
              if(v[0]=="'" && v[v.length-1]=="'")
                query1[0][k] = v.substring(1, v.length - 1);
            } */
            console.log(query1);
            callback(null,{"code":"+1","error_type": query1});
            
        
        }
        else if(query1.length==0)
        {
            
            //res.send(JSON.stringify({"code":"-1","error_type":"NO_USER"}));  
            callback(null,{"code":"-1","error_type":"NO_USER"});
        }
        else 
        {
            
            //res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
            callback(null,{"code":"-1","error_type":"LOGIN_ERROR"});
        }     

    }   
}


module.exports.handle_request = handle_request;

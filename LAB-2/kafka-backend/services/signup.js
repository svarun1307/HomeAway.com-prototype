//import the require dependencies

var bodyParser = require('body-parser');


const uuidv1 = require('uuid/v1');
var validator = require('validator');


/*************************************************/
const {mongoose,jwtsecret} = require('../mongoose/mongoose');
var {Users} = require('../models/users');
var {Property} = require('../models/property');
var db = mongoose.connection;

const executeAsyncQueryMongo  = require('../mongoose/trigger.js');
/************BCRYPT SETTINGS ************/
const bcrypt = require('bcrypt');
const saltRounds = 10;
console.log(bcrypt);

async function handle_request(msg, callback){

    
    //console.log(msg.perform);
   
    //console.log("Inside book kafka backend SIGNUP");
    //console.log(msg);
    if(msg.perform == 'USER_SIGNUP' )
    {

        let {firstnames,lastnames,signupemails,signuppassword,loginType} = msg.performdata;
        //console.log(firstnames,lastnames,signupemails,signuppassword);
        if(firstnames.trim()=='' || lastnames.trim()=='')
        {
            callback(null,{"code":"-1","error_type":"NAMES_ERROR"});
        }
        else if(!validator.isEmail(signupemails))
        {
            //res.send(JSON.stringify({"code":"-1","error_type":"EMAIL_ERROR"}));
            callback(null,{"code":"-1","error_type":"EMAIL_ERROR"});
        }
        else if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g).test(signuppassword))
        {
            //res.send(JSON.stringify({"code":"-1","error_type":"PASSWORD_ERROR"}));
            callback(null,{"code":"-1","error_type":"PASSWORD_ERROR"});
        }
        else 
        {
            //***********CHECK IF EMAIL ALREADY EXISTS **************/

            var user = new Users({
                email : signupemails,
                acctype : loginType
            });

            let conditions = { 
                    $and: [ 
                        { email: signupemails }, 
                        { acctype: loginType} 
                    ] 
            };


            let retM = await executeAsyncQueryMongo.executeAsyncQueryMongo(Users,conditions,'find');
            //console.log(retM);

            try
            {
                if(Array.isArray(retM))
                {
                    if(retM.length == 0)
                    {
                        let _m = msg;
                        let currentTime = new Date().getTime();
                        bcrypt.genSalt(saltRounds, async function(err, salt) {       
                            //console.log(salt);   
                            //console.log(_m.performdata.signuppassword);
                            bcrypt.hash(_m.performdata.signuppassword, salt, async function(err, hash) {
                                // Store hash in your password DB.
                                let currentPropID = uuidv1();

                                var addUser = new Users({
                                    email : signupemails,
                                    acctype : loginType,
                                    user_random : currentPropID,
                                    name : firstnames,
                                    email : signupemails,
                                    joinedon : currentTime,
                                    ex1 : lastnames,
                                    ex2 : hash
                                });

                                let addM = await executeAsyncQueryMongo.executeAsyncQueryMongo(addUser,{},'insert');
                                console.log(addM);
                                //res.send(JSON.stringify({"code":"+1","error_type":"SUCC"}));
                                callback(null,{"code":"+1","error_type":"SUCC"});
                            });
                        });
                    }
                    else if(retM.length > 0)
                    {
                        //res.send(JSON.stringify({"code":"-1","error_type":"USER_EXISTS"}));  
                        callback(null,{"code":"-1","error_type":"USER_EXISTS"});
                    }
                }
                else if(retM === null)
                {
                    //res.send(JSON.stringify({"code":"-1","error_type":"USER_EXISTS"}));  
                    callback(null,{"code":"-1","error_type":"USER_EXISTS"});
                }
            }
            catch(e)
            {
                console.log(e);
                //res.send(JSON.stringify({"code":"-1","error_type":"DB_ERROR"}));  
                callback(null,{"code":"-1","error_type":"DB_ERROR"});
            }


        //callback(null,null,{});
        console.log("after callback");
        }
    }   
}


module.exports.handle_request = handle_request;
//import the require dependencies

var bodyParser = require('body-parser');
const uuidv1 =  require('uuid');
/*************************************************/
const {mongoose,jwtsecret} = require('../mongoose/mongoose');
var {Users} = require('../models/users');
var {Property} = require('../models/property');
var db = mongoose.connection;

const executeAsyncQueryMongo  = require('../mongoose/trigger.js');


async function handle_request(msg, callback){

    
    if(msg.perform == 'GET_QUESTIONS' )
    {
        let userType = msg.userType;
        let userid = msg.userid;
        if(userType=='SELLER')
        {

            let conditionsold = { 
                userid
            };
            let conditions = {      
                $and: [ 
                    { userid: userid },
                    {'questions.0': {$exists: true}}
                ]
                 
                
            }; 
            //console.log("SAVING THE USERS QNS");
            let retM = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,conditions,'find');
            retM = JSON.parse(JSON.stringify(retM));
        
            //response.send(JSON.stringify({"code":"+1","error_type": {'type':userType , 'details':retM}  }));  
            callback(null,{"code":"+1","error_type": {'type':userType , 'details':retM}  });
            
        }
        else 
        {
            let conditionsold = { 
                "user_random" : userid
            };

            let conditions = { 
                "questions.askerid" : userid
            };
            /* let conditions = {      
                $and: [ 
                    {'bookings.askerid': userID},

                ]
                 
                
            };   */

            //console.log("SAVING THE USERS QNS");
            let retM2 = await executeAsyncQueryMongo.executeAsyncQueryMongo(Users,conditions,'find');
            //response.send(JSON.stringify({"code":"+1","error_type": {'type':userType , 'details':retM2}  }));  
            callback(null,{"code":"+1","error_type": {'type':userType , 'details':retM2}  });

           
        }

    }   
}


module.exports.handle_request = handle_request;











       
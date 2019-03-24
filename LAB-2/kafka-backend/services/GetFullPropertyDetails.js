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
    if(msg.perform == 'GET_FULL_PROPERTY' )
    {
        let idx = msg.performdata;//req.params.givenID;
    
            let conditions1 = { 
                uniqueid: idx
            };

            try
            {
        
                let item1 = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,conditions1,'find');
                console.log(item1);
                item1 = JSON.parse(JSON.stringify(item1));
                let item2 = item1[0]["images"];
                let userid = item1[0]["userid"];
                
                let conditions2 = { 
                    $and : [
                        { acctype : 'SELLER' },
                        { user_random : userid }
                    ]
                };

                let item3 = await executeAsyncQueryMongo.executeAsyncQueryMongo(Users,conditions2,'find');
                item3 = JSON.parse(JSON.stringify(item3));
                console.log(item3);
                
                


                //****************GET USER PHOTO DETAILS ****************//

                item3[0]['userid'] = userid;
                item1[0]['ownerDetails'] = item3;
                //res.send(JSON.stringify({"code":"+1","error_type":item1}));  
                callback(null,{"code":"+1","error_type":item1})

                /******************************************************* */
            }  
            catch(e)
            {
                console.log("ERROR",e);
                //res.send(JSON.stringify({"code":"-1","error_type":"DB_ERROR"}));  
                callback(null,{"code":"+1","error_type":item1})
            }
                
         

    }   
}


module.exports.handle_request = handle_request;
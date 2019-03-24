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

    
    if(msg.perform == 'SAVE_QUESTION' )
    {
            /**************PUSH ANSWERS ***************/
            let g = msg.performdata;
            let questionid = g.questionid;
            let propertyID = g.propertyID;
            let askedid = g.askerid;
            let qns = g.questionanswer;

            let tt = new Date().getTime() 
            let conditions = { 
                "questions.questionid" : questionid
            };
            
            let update_data = {
                    $set : { 
                        "questions.$.qnanswer" : qns ,
                        "questions.$.answeredAt" : tt ,
                    }
            }


            let conditions2 = { 
                "questions.questionid" : questionid
            };
            
            let update_data2 = {
                    $set : { 
                        "questions.$.qnanswer" : qns ,
                        "questions.$.answeredAt" : tt ,
                    }
            }

            /* console.log("FILE IS-------");
            console.log(req.files[0]["filename"]);
            console.log("update data");
            console.log(update_data); */
            let retM3 = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,conditions,'update',update_data);
            console.log(retM3);
            let retM4 = await executeAsyncQueryMongo.executeAsyncQueryMongo(Users,conditions2,'update',update_data2);
            console.log(retM4);

            if(retM3['nModified']>0 && retM4['nModified']>0)
            {
                //response.send(JSON.stringify({"code":"+1","error_type":"SUCCESS"}));  
                callback(null,{"code":"+1","error_type":"SUCCESS"});
            }
            else 
            {
                //response.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
                callback(null,{"code":"-1","error_type":"LOGIN_ERROR"});
            }

    }   
}


module.exports.handle_request = handle_request;







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

    
    if(msg.perform == 'ASK_QUESTION' )
    {
        /***********UPDATE BOOKINGS ARRAY IN USERS AND THE PROPERTY SCHEMA *******/

        let userid = msg.userid;//request.user[0]['user_random'];
        let commonQNID = uuidv1();

        let conditions = { 
            user_random: userid
        };

        let conditions2 = { 
            uniqueid: msg.performdata.propertyID
        };

        let askedAt = new Date().getTime();
        let update_data = {
            $push : {
                questions :[
                    { 
                        questionid : commonQNID ,
                        firstname : msg.performdata.fname1 ,
                        lastname : msg.performdata.lname1 ,
                        emailaddress : msg.performdata.email1,
                        mobilenumber : msg.performdata.mobile1,
                        qnmessage : msg.performdata.msg,
                        qnanswer : '',
                        askedAt : askedAt,
                        answeredAt : '',
                        askerid : userid,
                        propertyID : msg.performdata.propertyID
                    }
            ]}
        }

        let update_data2 = {
            $push : {
                questions :[
                    { 
                        questionid : commonQNID ,
                        firstname : msg.performdata.fname1 ,
                        lastname : msg.performdata.lname1 ,
                        emailaddress : msg.performdata.email1,
                        mobilenumber : msg.performdata.mobile1,
                        qnmessage : msg.performdata.msg,
                        qnanswer : '',
                        askedAt : askedAt,
                        answeredAt : '',
                        askerid : userid,
                        propertyID : msg.performdata.propertyID
                    }
            ]}
        }



        let retM = await executeAsyncQueryMongo.executeAsyncQueryMongo(Users,conditions,'update',update_data);
        console.log(retM);


        let retM2 = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,conditions2,'update',update_data2);
        console.log(retM2);


        //response.send(JSON.stringify({"code":"+1","error_type": "QUESTION_SUCCESS"}));
        callback(null,{"code":"+1","error_type": "QUESTION_SUCCESS"});

    }   
}


module.exports.handle_request = handle_request;







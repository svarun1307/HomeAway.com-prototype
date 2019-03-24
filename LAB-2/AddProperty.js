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
   
    console.log("Inside book kafka backend SIGNUP");
    console.log(msg);
    if(msg.perform == 'ADD_PROPERTY' )
    {
            console.log("ADDING PROPERTY");
            //console.log(req.files);
            let _m = msg.performdata;
            let currentTime = Date.now();
            let currentPropID = uuidv1();
            let user_id = msg.sessionid;//req.session.user;

            //let currentTime = Date.now();
            //let currentPropID = uuidv1();
            let currentImageArrays = [];
            for(var k=0; k < msg.files.length ; k++)
            {
                console.log("adding files here to the file code");
                /*let fileUploadQuery = "INSERT INTO `property_images`(`id`, `user_id`, `property_id`, `name`, `path`, `time`, `ex1`) VALUES (NULL,'"+user_id+"','"+currentPropID+"','"+req.files[k]['originalname']+"','"+req.files[k]['filename']+"','"+currentTime+"','"+JSON.stringify(req.files[k])+"')";*/
                currentImageArrays.push({
                    name : msg.files[k]['originalname'],
                    path : msg.files[k]['location'],
                    time : currentTime,
                    ex1 : JSON.stringify(msg.files[k])

                });
                
                //dbconn.query(fileUploadQuery,function(err,rows,fields){});
            }
            console.log(currentImageArrays);
            let addProperty = new Property({
                uniqueid : currentPropID,
                location : _m["placeLocation"],
                headline : _m["propHeadLine"],
                propdesc : _m["propdesc"],
                type : _m["propType"],
                bedrooms : _m["propbedRooms"],
                accomodates : _m["propbedaccom"],
                bathrooms : _m["propbathrooms"],
                photocount : msg.files.length,
                startDate : _m["initDate"],
                endDate : _m["finalDate"],
                currency : _m["currency"],
                nights : _m["propminstay"],
                baseRate : _m["propnightly"],
                userid : user_id,
                username:'',
                timeadded : currentTime,
                ex1 : _m["propAmenities"],
                ex2 : _m["propArea"],
                ex3 : '',
                ex4 : '',
                ex5 : '',
                images : currentImageArrays
            });

            console.log("ADD-PROPERTY----------");
            console.log(addProperty);

            let addP = await executeAsyncQueryMongo.executeAsyncQueryMongo(addProperty,{},'insert');
            console.log(addP);
            callback(null,"+1");
            //res.send("+1");

    }   
}


module.exports.handle_request = handle_request;
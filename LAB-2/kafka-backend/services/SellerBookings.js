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

    
    if(msg.perform == 'SELLER_BOOKINGS' )
    {

        let userID = msg.performdata;
        let conditions = {      
            $and: [ 
                { userid: userID },
                {'bookings.0': {$exists: true}}
            ]
             
            
        };  
        /* let query1a = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,conditions,'find');
        console.log(query1a); */

        let operations = {
            sort : {
                timeadded : -1
            }
        };
        //let query1a = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,conditions,'find');
        //console.log(query1a);

        let query1a = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,conditions,'aggregate',operations);
        console.log(query1a);
        let query1 = JSON.parse(JSON.stringify(query1a));

        //let query1 = JSON.parse(JSON.stringify(query1a));

        try
        {
            //let item1 = await executeAsyncQuery(sql1);
            //console.log(item1);
            for(let ls = 0 ; ls < query1.length ; ls++)
            {
                
                let indImages = query1[ls]['images'];
                //console.log(propID+"-------------------");
                //console.log(indImages);
                if(indImages.length == 0)
                {
                    query1[ls]["CIM"] = [];
                }
                else 
                {
                    query1[ls]["CIM"] = [];
                    for(let lsinner = 0 ; lsinner < indImages.length ; lsinner++)
                    {
                        var file = indImages[lsinner]["path"];
                        /* var fileLocation = path.join(__dirname + '/uploads',file);
                        var img = fs.readFileSync(fileLocation);
                        var base64img = new Buffer(img).toString('base64'); */
                        query1[ls]["CIM"].push(file);
                    }
                }
            }
            //console.log("------FINAL-------");
            if(query1.length==0)
                query1 = [];
            callback(null,{"code":"+1","error_type":query1});
        }
        catch(e)
        {
            console.log("ERROR",e);
            //res.send(JSON.stringify({"code":"-1","error_type":"DB_ERROR"}));  
            callback(null,{"code":"-1","error_type":"DB_ERROR"});
        }

    }   
}


module.exports.handle_request = handle_request;












       
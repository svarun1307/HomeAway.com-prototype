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


async function handle_request(msg, callback){

    
    console.log(msg.perform);
   
    console.log("Inside book kafka backend SIGNUP");
    console.log(msg);
    if(msg.perform == 'SEARCH_DATA' )
    {
        console.log("is filters");
        console.log(msg.perform.isFilters);
        let isFilters =  msg.performdata.isFilters;
        if(!isFilters)
        {
            console.log("IFFFF");
            /*******************WHEN FILTERS ARE NOT IN USE*********************** */
            let {guests,whereTo,fromTo,fromTo2,skip,limit} = msg.performdata;
            //console.log(new Date(fromTo).getTime());
            let sTIME = new Date(msg.performdata.fromTo).getTime();
            let eTIME = new Date(msg.performdata.fromTo2).getTime();
            console.log(sTIME+"--"+eTIME);
        
            let initalFilter = " SELECT * FROM `property` WHERE `location` LIKE '%"+whereTo+"%' AND  `uniqueid`!='' AND `accomodates`>='"+guests+"' AND `startDate`<='"+sTIME+"' AND `endDate`>='"+eTIME+"' "; 
            console.log(initalFilter);
            
        
            let conditions = { 
                    $and: [ 
                        { accomodates: { $gte: guests }},
                        { uniqueid: { $ne: '' }},
                        { startDate: { $lte : sTIME }},
                        { endDate: { $gte : eTIME }},
                        { location:  new RegExp(whereTo + '', 'i') }
                    ] 
            };
        
            //console.log(conditions);
        
            //let retM = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,conditions,'find');
            //console.log(retM);
        
            let operations = {
                //{$sort: { timeadded: -1 }},
                //{$skip : skip},
                //{$limit : limit}
                skip,
                limit,
                sort : {
                    timeadded : -1
                }
                };
        


                let operationsLookAhead = {
                    sort: { timeadded: -1 },
                    skip : skip+limit,
                    limit
                };
        
                let retMor = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,conditions,'aggregate',operations);
                let retMorF = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,conditions,'aggregate',operationsLookAhead);
            console.log(retMor.length);
        
        
            let retM1 = JSON.parse(JSON.stringify(retMor));
            
        
            let dcx = (retMorF.length > 0) ? true : false   
        
            if(retM1.length==0)
            {
                //res.send(JSON.stringify({"code":"+1","error_type":[], "lookahead" : dcx }));
                callback(null,{"code":"+1","error_type":[], "lookahead" : dcx });
            }
            else
            {
                //res.send(JSON.stringify({"code":"+1","error_type":retM1 ,  "lookahead" : dcx}));
                callback(null,{"code":"+1","error_type":retM1 ,  "lookahead" : dcx});
            }
                


        }
        else
        {
            console.log("ELSEEE");
            let initarray = [];
            const {filterText,fromToFL,fromTo2FL,roomcounter,skip,limit,currentmin,currentmax,min,max} = msg.performdata;
            console.log(filterText);
            console.log(fromToFL);
            console.log(fromTo2FL);
            console.log(roomcounter);
            console.log(currentmax);
            console.log(currentmin);
            console.log(min);
            console.log(max);
            console.log(skip);
            console.log(limit);
            console.log(currentmax==max);
            console.log(currentmin==min);
            if(filterText != '')
            {
                initarray.push({
                    location:  new RegExp(filterText + '', 'i') 
                });
            }
            if(fromToFL!='' && fromTo2FL!='')
            {
                let sTIME = new Date(fromToFL).getTime();
                let eTIME = new Date(fromTo2FL).getTime();
                console.log(sTIME);
                console.log(eTIME);
                initarray.push(
                    { startDate: { $lte : sTIME }},
                    { endDate: { $gte : eTIME }},
                );
            }
            if(roomcounter != '' && roomcounter!=0)
            {
                initarray.push({
                    bedrooms: roomcounter,
                });
            }
            if(currentmin!=min || currentmax!=max)
            {
                console.log("yes in price");
                initarray.push(
                        { baseRate: { $lte : currentmax }},
                        { baseRate: { $gte : currentmin }},
                    );
            }
            
            if(initarray.length==0)
            {
                initarray.push(
                    {
                        uniqueid : {
                            $ne : ''
                        }
                    }
                )
            }

            console.log(initarray);
            let filterconditions = { 
                $and: initarray
                //location:  new RegExp(filterText + '', 'i') 
            };

            //let filterretMor = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,filterconditions,'find',operations);
            //let filterretMor = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,filterconditions,'find');
            //console.log(filterretMor.length);
        
            let operations = {
                skip,
                limit,
                sort : {
                    timeadded : -1
                }
            };
        


            let operationsLookAhead = {
                sort: { timeadded: -1 },
                skip : skip+limit,
                limit
            };
        
            let retMor = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,filterconditions,'aggregate',operations);
            let retMorF = await executeAsyncQueryMongo.executeAsyncQueryMongo(Property,filterconditions,'aggregate',operationsLookAhead);
            console.log(retMor);
            console.log(retMorF);

            let retM1 = JSON.parse(JSON.stringify(retMor));
            
            /* for(let ls = 0 ; ls < retM1.length ; ls++)
            {
                //console.log(retM1[ls]);
                let indImages = retM1[ls]['images'];
                retM1[ls]["CIM"] = [];
                for(let lsinner = 0 ; lsinner < indImages.length ; lsinner++)
                {
                    var file = indImages[lsinner]["path"];
                    var fileLocation = path.join(__dirname + '/uploads',file);
                    var img = fs.readFileSync(fileLocation);
                    var base64img = new Buffer(img).toString('base64');
                    retM1[ls]["CIM"].push(base64img);
                }
            } */
        
            let dcx = (retMorF.length > 0) ? true : false  ; 
            console.log(retM1.length);
            if(retM1.length==0)
            {
                //res.send(JSON.stringify({"code":"+1","error_type":[], "lookahead" : dcx }));
                callback(null,{"code":"+1","error_type":[], "lookahead" : dcx });
            }
            else
            {
                //res.send(JSON.stringify({"code":"+1","error_type":retM1 ,  "lookahead" : dcx}));
                callback(null,{"code":"+1","error_type":retM1 ,  "lookahead" : dcx});
            }
                



        }

    }   
}


module.exports.handle_request = handle_request;
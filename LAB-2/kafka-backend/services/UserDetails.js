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


async function handle_request(msg, callback){

    console.log(msg.perform);
    if(msg.perform == 'USER_DETAILS' )
    {
        let conditions = { 
            user_random: msg.performdata
          };
          let retM1 = await executeAsyncQueryMongo.executeAsyncQueryMongo(Users,conditions,'find');
          console.log(retM1);
          let retM = {};
          retM  = retM1;
          retM = JSON.parse(JSON.stringify(retM1));
          //dbconn.query(conQ,function(err,row,fields){
            if(retM.length==1)
            {
                if(retM.length == 0)
                {
                  //res.send(JSON.stringify({"code":"-1","error_type":"NO_USER"}));  
                  callback(null,{"code":"-1","error_type":"NO_USER"});
                }
                else if(retM.length == 1)
                {
                  console.log(retM);
                  console.log("CHANGING IMAGE CONFIG");
                  delete retM[0]["ex2"];
                  retM[0]["fullBaseIMG"] = '';
                  /* for(var i = 0 ; i < Object.keys(row[0]).length ; i++)
                  {
                    let k = Object.keys(row[0])[i];
                    //console.log(k);
                    let v = row[0][k];
                    //console.log(v);
                    v = v + "";
                    if(v[0]=="'" && v[v.length-1]=="'")
                      row[0][k] = v.substring(1, v.length - 1);
                  } */
    
                  /************Add Image to the response *****************/
    
                  try
                  {
                    let imgMeta = retM[0]["photodata"];
                    if(imgMeta != '')
                    {
                
                        callback(null,{"code":"+1","error_type":retM[0]});
                    }
                    else 
                    {
                        retM[0]["fullBaseIMG"] = '';
                        //res.send(JSON.stringify({"code":"+1","error_type":retM[0]}));  
                        callback(null,{"code":"+1","error_type":retM[0]});
                    }
    
                  }
                  catch(w)
                  {
                    console.log(w);
                  }
                  
                  //res.writeHead(200, {'Content-Type': 'image/jpg' });
                  //res.end(base64img);
    
    
                  
                }
                else 
                {
                  //res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));  
                  callback(null,{"code":"-1","error_type":"LOGIN_ERROR"});
                }
            }
            else 
            {
                //res.send(JSON.stringify({"code":"-1","error_type":"LOGIN_ERROR"}));       
                callback(null,{"code":"-1","error_type":"LOGIN_ERROR"});
            }
          //});
    }
    

   
    console.log("Inside book kafka backend USERDETAILS");
    console.log(msg);

}


module.exports.handle_request = handle_request;
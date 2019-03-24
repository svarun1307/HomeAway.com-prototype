/** 
*
*  Lab-1 Calculator ( Due 30th Sept 2pm)
*  Author : Varun Shrivastav 
* Student ID : 011438531
*
*/

let express = require("express");
const app = express();

let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


app.get("/",function(req,res){
    res.send("Test");
});

app.post("/calculate",function(req,res){
   // res.send(req.body);
    console.log("Calculating expression route.");
    try
    {
        let exp = req.body.expr;
        exp = JSON.parse(exp);
        let evalex = eval(exp);
        evalex = evalex + "";
        res.send(evalex);
    }
    catch(e)
    {
        res.send("ERROR"+e);
    }
});


app.listen(8080,()=>{
    console.log("App running on port 8080");
});


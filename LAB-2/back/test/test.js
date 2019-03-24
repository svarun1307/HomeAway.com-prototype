var chai = require('chai'), 
chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

//firstnames,lastnames,signupemails,signuppassword,loginType

it("Should register user only if user doesn't exist ", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/user-signup')
    .send({"firstnames":"55scuderia@gmail","lastnames":"test_values","signupemails":"55scuderia@gmail.com","signuppassword":"Alpha12345","loginType":"TRAVELLER"})
    .end(function(err, res){
        if(err){
            //console.log("error");
            done(err);
        }
        else {
            //console.log((JSON.parse(res.text)));
            expect(res).to.be.json;
            done();
        }
    });
});


it("Should check for user login validation and return userID also if successfull ", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/login-validate')
    .send({"loginemail":"55scuderia@gmail.com","loginpassword":"55Scuderia","loginType":"TRAVELLER"})
    .end(function(err, res){
        if(err){
            //console.log("error");
            done(err);
        }
        else {
            //console.log((JSON.parse(res.text).userID));
            expect(res).to.be.json;
            done();
        }
    });
});

it("Should fetch the complete details of a property ", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/getFullPropertyDetails/0fe36be0-e078-11e8-8c17-9f5b9e304047')
    .end(function(err, res){
        if(err){
            //console.log("error");
            done(err);
        }
        else {
            //console.log(Object.keys(JSON.parse(res.text).error_type[0]));
            expect(res).to.be.json;
            done();
        }
    });
});


it("Should fetch the next image in the image slider using given propertyID and slider index", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/getSinglePropertyImage')
    .send({ "currentID": "37300970-c83f-11e8-8b09-eb62f01f6cef", "currentImage" : "0"})
    .end(function(err, res){
        if(err){
            //console.log("error");
            done(err);
        }
        else {
            //console.log(JSON.parse(res.text).error_type[0].firstImageData.length);
            expect(res).to.be.json;
            done();
        }
    });
});


it("Should fetch user profile details from the server", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/public-profiles/edea1270-be33-11e8-8e8a-75e4ff1510b5')
    .end(function(err, res){
        if(err){
            //console.log("error");
            done(err);
        }
        else {
            //console.log("User email is : " + JSON.parse(res.text).error_type[0].email);
            expect(res).to.be.json;
            done();
        }
    });
});
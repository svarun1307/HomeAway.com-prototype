'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var db = require('../mongoose/mongoose');
var config = require('../mongoose/mongoose');
var {Users} = require('../models/users');

// Setup work and export for the JWT passport strategy


module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.jwtsecret,
        expiresIn : "2d"
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        
        Users.find({ user_random : jwt_payload.data.userrandom } , function(err,res){
            //console.log(res);
            //console.log(err);
            if(err)
            {
                return callback(err,false);
            }
            else 
            {
                callback(null, res);
            }
            
        }
        );
    }));
};

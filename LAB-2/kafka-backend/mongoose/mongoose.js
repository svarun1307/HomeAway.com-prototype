var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/BookApp');
const username = '44scuderia'
const adminPass = '44Scuderia';
const dbUrl = `mongodb://${username}:${encodeURIComponent(adminPass)}@ds131973.mlab.com:31973/home_away_1`;
const jwtsecret = 'JWT TOKEN FOR LAB-2 273SHIM';

console.log(dbUrl);
//mongoose.connect(encodeURI('mongodb://44scuderia:MynewDB@4488@ds131973.mlab.com:31973/home_away_1'), { uri_decode_auth: true ,useNewUrlParser: true })
mongoose.connect(encodeURI(dbUrl), {  poolSize: 120, useNewUrlParser: true });

module.exports = {
    mongoose,
    jwtsecret
};
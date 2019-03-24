const graphql = require('graphql');
const _ = require('lodash');
/************BCRYPT SETTINGS ************/
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuidv1 = require('uuid/v1');


const {mongoose,jwtsecret} = require('../mongoose/mongoose');
const executeAsyncQueryMongo = require('../mongoose/helper');
var {Users} = require('../models/users');
var {Property} = require('../models/property');
let UserType = require('../types/user');
let PropertyType =  require('../types/property');


//console.log(helper);
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        userslogin : {
            type: UserType,
            args: {
                ex2: { type: GraphQLString },
                email : { type : GraphQLString },
                acctype : { type : GraphQLString }
            },
            async resolve(parent, args){
                    let conditions = { 
                        $and: [ 
                            { email: args.email }, 
                            { acctype: args.acctype} 
                        ] 
                    };
            
                    let retM = await executeAsyncQueryMongo(Users,conditions,'find');
                    //console.log(retM);
                    try
                    {
                        if(Array.isArray(retM))
                        {
                            if(retM.length == 1)
                            {
                                let rows = retM;
                                let oldHash = rows[0]["ex2"];
                                console.log(args.ex2);
                                let s = bcrypt.compareSync(args.ex2, oldHash); // true
                                //console.log(s);
                                if(s)
                                {
                                    console.log("User logged in successfully");
                                    console.log(rows[0]);
                                    return rows[0];
                                }
                                else 
                                {
                                    console.log("Login Validation failed");
                                    return "-1";
                                }
                            }
                            else
                            {
                                //return (({"code":"-1","error_type":"EMAIL_NOT_EXIST"}));
                            }
                        }
                        else if(retM === null)
                        {
                            return "-1"
                        }
                    }
                    catch(e)
                    {
                        return "-1";
                    }
            }
        },
        findProperty : {
            type: new GraphQLList(PropertyType),
            async resolve(parent, args){
            
                    try
                    {
                        let retMor = await executeAsyncQueryMongo(Property,{},'aggregate',{});
                        console.log(retMor);
                        return retMor;
                    }
                    catch(e)
                    {
                        console.log(e);
                        return "-1";
                    }
            }
        },
        findUser : {
            type: UserType,
            args: {
                data: { type: GraphQLString },
            },
            async resolve(parent, args){
            
                    try
                    {
                        let xx = args.data + "";
                        let d =  await executeAsyncQueryMongo(Users,{user_random :xx},'find');
                        console.log(d);
                        return d[0];
                    }
                    catch(e)
                    {
                        console.log(e);
                        return "-1";
                    }
            }
        },
        makeBooking : {
            type: PropertyType,
            args: {
                userid: { type: GraphQLString },
                propertyid: { type: GraphQLString },
                startBook : { type : GraphQLString},
                endBook : { type : GraphQLString },
                bookedOn : { type : GraphQLString }
            },
            async resolve(parent, args){
            
                    try
                    {
                        let xx = args.data + "";
                        let conditions = {
                            propertyid : args.propertyid
                        }
                        let update_data = {
                            userid : args.userid,
                            propertyid : args.propertyid,
                            startBook : args.startBook,
                            endBook : args.endBook,
                            bookedOn : args.bookedOn
                        }
                        let retM3 = await executeAsyncQueryMongo(Property,conditions,'update',update_data);
                        console.log(retM3);
                        return retM3;
                    }
                    catch(e)
                    {
                        console.log(e);
                        return "-1";
                    }
            }
        },
        getBooking : {
            type: PropertyType,
            args: {
                userid: { type: GraphQLString },
            },
            async resolve(parent, args){
            
                    try
                    {
                        let conditions = {      
                            $and: [ 
                                { userid: args.userid },
                                {'bookings.0': {$exists: true}}
                            ]
                             
                            
                        };  
                        let query1a = await executeAsyncQueryMongo(Property,conditions,'find');
                        console.log(query1a);
                        return query1a;
                    }
                    catch(e)
                    {
                        console.log(e);
                        return "-1";
                    }
            }
        }
        
        
        /* (userid : $userid , propertyid: $propertyid, startBook :$startBook, endBook : $endBook, bookedOn : $bookedOn )
        {
            userid
            propertyid
            startBook
            endBook
            bookedOn */
    }
});

var count =10;
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser : {
            type : UserType,
            args: {
                name: { type: GraphQLString },
                email : { type : GraphQLString },
                ex1 : { type : GraphQLString },
                ex2 : { type : GraphQLString },
                acctype : { type : GraphQLString }
            },
            async resolve(parent, args){
            
                bcrypt.genSalt(saltRounds, async function(err, salt) {       
                    bcrypt.hash(args.ex2, salt, async function(err, hash) {
                        // Store hash in your password DB.
                        let currentPropID = uuidv1();
                        let currentTime = new Date().getTime();

                        let temp = new Users({
                            email : args.email,
                            acctype : args.acctype,
                            user_random : currentPropID,
                            name : args.name,
                            email : args.email,
                            joinedon : currentTime,
                            ex1 : args.ex1,
                            ex2 : hash
                        });
                        let addP = await temp.save();
                        console.log("User signed up successfully");
                        console.log(addP);
                        return addP;
                    });
                });
            }
        },
        updateUser : {
            type : UserType,
            args: {
                user_random: { type: GraphQLString },
                name : { type: GraphQLString },
                phone : { type: GraphQLString },
                about : { type: GraphQLString },
                city : { type: GraphQLString },
                country : { type: GraphQLString },
                school : { type: GraphQLString },
                hometown : { type: GraphQLString },
                languages : { type: GraphQLString },
                gender : { type: GraphQLString },
                ex1 : { type: GraphQLString }
            },
            async resolve(parent, args){
                    console.log(args);
                    //console.log(update_data);
                    let conditions = { 
                        user_random: args.user_random
                    };
                    let update_data = {
                        name : args.name,
                        phone : args.phone,
                        about : args.about,
                        city : args.city,
                        country : args.country,
                        company : args.company,
                        school : args.school,
                        hometown : args.hometown,
                        languages : args.languages,
                        gender : args.gender,
                        ex1 : args.ex1
                    }

                    let retM = await executeAsyncQueryMongo(Users,conditions,'update',update_data);
                    console.log(retM);

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
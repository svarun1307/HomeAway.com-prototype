var mongoose =require('mongoose');

var Users= mongoose.model('Users',{
    user_random : {
        type : String,
        default : ''
    },
    name :{
        type : String,
        default : ''
    },
    email :{
        type : String,
        required: true
    },
    phone :{
        type : String,
        default : ''
    },
    about :{
        type : String,
        default : ''
    },
    city :{
        type : String,
        default : ''
    },
    country :{
        type : String,
        default : ''
    },
    company :{
        type : String,
        default : ''
    },
    school :{
        type : String,
        default : ''
    },
    hometown :{
        type : String,
        default : ''
    },
    languages :{
        type : String,
        default : ''
    },
    gender :{
        type : String,
        default : ''
    },
    joinedon :{
        type : Date,
        default : ''
    },
    acctype :{
        type : String,
        default : ''
    },
    photo :{
        type : String,
        default : ''
    },
    photodata :{
        type : Object,
        default : ''
    },
    ex1 :{
        type : String,
        default : ''
    },
    ex2 :{
        type : String,
        default : ''
    },
    ex3 :{
        type : String,
        default : ''
    },
    bookings : [
        {
            propertyid : {
                type : String,
                default : ''
            },
            startBook : {
                type : String,
                default : ''
            },
            endBook : {
                type : String,
                default : ''
            },
            bookedOn : {
                type : String,
                default : ''
            }
        }
    ],
    questions : [
        {
            questionid : {
                type : String,
                default : ''
            },
            firstname : {
                type : String,
                default : ''
            },
            lastname : {
                type : String,
                default : ''
            },
            emailaddress : {
                type : String,
                default : ''
            },
            mobilenumber : {
                type : String,
                default : ''
            },
            qnmessage : {
                type : String,
                default : ''
            },
            qnanswer : {
                type : String,
                default : ''
            },
            askedAt : {
                type : String,
                default : ''
            },
            answeredAt : {
                type : String,
                default : ''
            },
            askerid : {
                type : String,
                default : ''
            },
            propertyID : {
                type : String,
                default  : ''
            }
        }
    ]
})

module.exports = {Users};


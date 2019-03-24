var mongoose =require('mongoose');

//BOOKINGS DETAILS TO THE PROPERTY ARRAYS ALSO

var Property= mongoose.model('Property',{
    uniqueid : {
        type : String,
        default : ''
    },
    location :{
        type : String,
        default : ''
    },
    headline :{
        type : String,
        default: ''
    },
    propdesc :{
        type : String,
        default : ''
    },
    type :{
        type : String,
        default : ''
    },
    bedrooms :{
        type : String,
        default : ''
    },
    accomodates :{
        type : String,
        default : ''
    },
    bathrooms :{
        type : String,
        default : ''
    },
    phtocount :{
        type : String,
        default : ''
    },
    startDate :{
        type : String,
        default : ''
    },
    endDate :{
        type : String,
        default : ''
    },
    currency :{
        type : String,
        default : ''
    },
    nights :{
        type : String,
        default : ''
    },
    baseRate :{
        type : String,
        default : ''
    },
    userid :{
        type : String,
        default : ''
    },
    username :{
        type : String,
        default : ''
    },
    timeadded :{
        type : String,
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
    ex4 :{
        type : String,
        default : ''
    },
    ex5 :{
        type : String,
        default : ''
    },
    images : [
        {
            name : {
                type : String,
                default : ''
            }, 
            path : {
                type : String,
                default : ''
            },
            time : {
                type : String,
                default : ''
            },
            ex1 : {
                type : String,
                default : ''
            }
        }
    ],
    bookings : [
        {
            userid : {
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



module.exports = {Property};


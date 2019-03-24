const graphql = require('graphql');
const _ = require('lodash');
const BookingsType = require('./bookings');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const PropertyType = new GraphQLObjectType({
    name: 'Property',
    fields: ( ) => ({
        id: { type: GraphQLString },
        uniqueid: { type: GraphQLString },
        location: { type: GraphQLString },
        headline: { type: GraphQLString },
        propdesc: { type: GraphQLString },
        type: { type: GraphQLString },
        bedrooms : { type: GraphQLString },
        phtocount : { type: GraphQLString },
        startDate : { type: GraphQLString },
        endDate: { type: GraphQLString },
        currency: { type: GraphQLString },
        nights: { type: GraphQLString },
        baseRate: { type: GraphQLString },
        userid: { type: GraphQLString },
        username: { type: GraphQLString },
        timeadded: { type: GraphQLString },
        ex1: { type: GraphQLString },
        ex2: { type: GraphQLString },
        ex3: { type: GraphQLString },
        ex4: { type: GraphQLString },
        ex5: { type: GraphQLString },
        bookings: { type:  new GraphQLList(BookingsType)  }

        /*
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, { authorId: parent.id });
            }
        } */
    })
});


module.exports = PropertyType;
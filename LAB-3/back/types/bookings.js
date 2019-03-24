const graphql = require('graphql');
const _ = require('lodash');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const BookingsType = new GraphQLObjectType({
    name: 'Bookings',
    fields: ( ) => ({
        propertyid: { type: GraphQLString },
        startBook: { type: GraphQLString },
        endBook: { type: GraphQLString },
        bookedOn: { type: GraphQLString },
    })
});


module.exports = BookingsType;
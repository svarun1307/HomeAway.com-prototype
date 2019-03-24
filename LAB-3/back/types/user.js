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



const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        user_random: { type: GraphQLString },
        phone: { type: GraphQLString },
        about: { type: GraphQLString },
        city: { type: GraphQLString },
        country : { type: GraphQLString },
        company : { type: GraphQLString },
        school : { type: GraphQLString },
        hometown: { type: GraphQLString },
        languages: { type: GraphQLString },
        gender: { type: GraphQLString },
        joinedon: { type: GraphQLString },
        acctype: { type: GraphQLString },
        photo: { type: GraphQLString },
        photodata: { type: GraphQLString },
        ex1: { type: GraphQLString },
        ex2: { type: GraphQLString },
        ex3: { type: GraphQLString },
        email: { type: GraphQLString },
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


module.exports = UserType;
import { gql } from 'apollo-boost';

/* const getLoginQuery = gql`
    {
        authors () {
            name
            id
        }
    }
`; */

const getLoginQuery = gql`
    query userslogin($loginemail: String,$loginpassword: String,$acctype : String){
        userslogin(email: $loginemail, acctype : $acctype,ex2 : $loginpassword){
            name,
            user_random,
            ex1,
            email
        }
    }
`;


const getProperty = gql` 
{
    findProperty {
      id
      uniqueid
      location
      headline
      propdesc
      type
      bedrooms
      phtocount
      startDate
      endDate
      currency
      nights
      baseRate
      userid
      username
      timeadded
      ex1
      ex2
      ex3
      ex4
      ex5
    }
  }
`;


const findUser = gql`
    query findUser($rand : String) {
        findUser (data : $rand) {
            id
            name
            user_random
            phone
            about
            city
            country
            school
            hometown
            languages
            gender
            joinedon
            acctype
            photo
            photodata
            ex1
            ex2
            ex3
            email
              
        }
    }
`

const getBookings = gql`
    query getBookings($userid : String) {
        getBooking (data : $userid) {
            id
            name
            user_random
            phone
            about
            city
            country
            school
            hometown
            languages
            gender
            joinedon
            acctype
            photo
            photodata
            ex1
            ex2
            ex3
            email
            
        }
    } 
`;




export { getLoginQuery, getProperty, findUser,getBookings };
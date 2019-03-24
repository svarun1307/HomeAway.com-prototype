
import { gql } from 'apollo-boost';

const addUserMutation = gql`
    mutation addUser($firstnames: String,$lastnames: String,$signupemails: String,$signuppassword: String,$acctype : String){
        addUser(name: $firstnames, email : $signupemails,ex1: $lastnames,ex2 : $signuppassword,acctype : $acctype){
            name
            email
            ex1
            ex2
            acctype
        }
    }
`;


const updateUserMutation = gql`
    mutation updateUser($user_random: String,$name: String,$phone: String,$about: String,$city : String,$country : String,$school : String,$hometown : String,$languages : String,$gender : String,$ex1 : String)
    {
        updateUser(user_random : $user_random, name : $name, phone : $phone, about : $about, city : $city, country : $country, school : $school, hometown: $hometown, languages: $languages, gender : $gender, ex1 : $ex1)
        {
            user_random
            name 
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
            ex1 
            ex2 
            ex3
        }
    }
`;


const makeBooking = gql`
    mutation makeBooking($userid : String, $propertyid : String, $startBook : String, $endBook : String , $bookedOn: String)
    {
        makeBooking(userid : $userid , propertyid: $propertyid, startBook :$startBook, endBook : $endBook, bookedOn : $bookedOn )
        {
            userid
            propertyid
            startBook
            endBook
            bookedOn
        }
    }
`




export {addUserMutation,updateUserMutation,makeBooking};

var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var Login = require('./services/login.js');
var Signup = require('./services/signup.js');
var UserDetails = require('./services/UserDetails.js');
var SearchData = require('./services/SearchData.js')
var GetFullPropertyDetails = require('./services/GetFullPropertyDetails.js');
var AddProperty =  require('./services/AddProperty.js');
const UpdateProfile = require('./services/UpdateProfile.js');
const PublicProfiles = require('./services/PublicProfiles.js');
const AskQuestions =  require('./services/AskQuestion.js');
const GetQuestions = require('./services/GetQuestions.js');
const SaveAnswers = require('./services/SaveAnswers.js');
const SellerBookings = require('./services/SellerBookings.js');
const TravellerBookings = require('./services/TravellerBookings.js');

/*****************Function to handle the topics for the cluster *******************/
function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log("==================================");
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            console.log(err);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("post_book",Login);
handleTopicRequest("users",Signup);

/****
***  
*** Topic : property
*** Service : Add Property By Owner
*/
handleTopicRequest("users",UserDetails);

/****
*** Search Data 
*** Topic : searches
*** Service : Search and Filter Data Requests
*/
handleTopicRequest("searches",SearchData);

/****
*** Get Property Details 
*** Topic : property
*** Service : Fetch property details for website
*/
handleTopicRequest("property",GetFullPropertyDetails);


/****
*** Add Property 
*** Topic : property
*** Service : Add Property By Owner
*/
handleTopicRequest("property",AddProperty);


/****
*** Update Profile 
*** Topic : users
*** Service : Update Profile with image 
*/
handleTopicRequest("users",UpdateProfile);

/****
*** Update Profile 
*** Topic : users
*** Service : Update Profile withOUT image 
*/
handleTopicRequest("users",UpdateProfile);

/****
*** Public Profiles
*** Topic : users
*** Service : Fetch Public Profiles
*/
handleTopicRequest("users",PublicProfiles);

/****
*** Ask Question
*** Topic : users
*** Service : Add Asked Question
*/
handleTopicRequest("users",AskQuestions);


/****
*** Get Question
*** Topic : users
*** Service : Get All Asked Question
*/
handleTopicRequest("users",GetQuestions);


/****
*** Save Answer to a  Question
*** Topic : users
*** Service : Save Answer
*/
handleTopicRequest("users",SaveAnswers);


/****
*** Fetch all Seller Questions
*** Topic : searches
*** Service : Seller Bookings
*/
handleTopicRequest("searches",SellerBookings);



/****
*** Fetch all Traveller Bookings
*** Topic : searches
*** Service : Traveller Bookings
*/
handleTopicRequest("searches",TravellerBookings);



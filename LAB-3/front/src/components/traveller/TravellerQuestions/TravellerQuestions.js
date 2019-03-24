import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import SellerDashBoardHeader from '../../common/SellerDashBoardHeader/SellerDashBoardHeader';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './TravellerQuestions.css';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import PropertyComponents from '../../common/PropertyComponent/PropertyComponent';
import { BASE_URL } from '../../common/AppSettings/AppSettings';
import QuestionAnswers from '../../common/QuestionAnswers/QuestionAnswers';



class TravellerQuestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placesArraySellerWithQuestions : [],
        }
    }

    componentDidMount()
    {
        
        let _s = this;
        let u = { userkey : sessionStorage.getItem('user-token'), usertype : "TRAVELLER"};
        console.log(u);

        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] = 
                'JWT ' + sessionStorage.getItem('user-token');
        //axios.post(BASE_URL+'/get-questions',u,{headers: {Authorization:'JWT ' + sessionStorage.getItem('user-token')}})
        let authstring =  'JWT ' + sessionStorage.getItem('user-token');
            axios({
                method: 'POST',
                data : u,
                url: BASE_URL+'/get-questions',
                headers: { 'Authorization': authstring}
            })
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log(response);
                if(response.status === 200){
                    //alert("User added successfully.");
                    try
                    {
                        let s = response.data;//JSON.parse(response.data);
                        //alert(s.code);
                        if(s.code == '-1')
                        {
                            alert("No results found for this search query.Please try again");
                        }
                        else if(s.code == '+1')
                        {
                            console.log("yes");
                            console.log(response.data);
                            //this.placesArray = this.props.location.state.passedData.error_type;
                            console.log(response.data.error_type.details);
                            _s.setState({
                                placesArraySellerWithQuestions : response.data.error_type.details
                            });
                        }

                    }
                    catch(e)
                    {
                        console.log(e);
                    }
                }else{
                    console.log("in else");
                }
            });
    }



    render() {

        console.log(this.state);
        console.log("this is the place for sleller qns");
        console.log(this.state.placesArraySellerWithQuestions);
        
        return(
           
            
            <div>

                <div className="container">
                    <div className="col-lg-12"><div className="col-lg-12">
                       
                                             
                        {
                            
                             this.state.placesArraySellerWithQuestions && this.state.placesArraySellerWithQuestions.map((player,i) => {  
                                console.log(player,"PLATER");
                                 
                                return (
                                    <div>
                                       
                                                   <div className="row">
                                                    
                                                    <div className="col-lg-12">                                  
                                                        <div><h4 className="qnsprop">My Questions</h4><hr/></div>
                                                    </div>
                                                    </div>
                                        
                        
                                                <div className="row">
                                                    
                                                    <div className="col-lg-1"></div>
                                                    <div className="col-lg-10 row">
                                                    {
                                    
                                                        player.questions.map((data2,i2)=>{
                                                                return <QuestionAnswers usertype="TRAVELLER"  qndata={data2}looper={i2}></QuestionAnswers>
                                                            })                                    
                                                        }  
                                                    </div>
                                                </div>
                                               
                                    </div> 
                                )
                            }) 
                            
                        }

                        {/* <QuestionAnswers  user="SELLER" ></QuestionAnswers> */}
                    </div>
                </div>
                </div>
            </div>
            
            
        )
    }
}
 

export default TravellerQuestions;

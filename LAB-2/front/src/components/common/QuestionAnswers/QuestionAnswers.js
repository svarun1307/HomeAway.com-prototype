import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import {Link} from 'react-router-dom';
import './QuestionAnswers.css';
import cookie from 'react-cookies';
import { BASE_URL } from '../AppSettings/AppSettings';


class QuestionAnswers extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        //alert(this.props.user);
        this.clickedOnProperty = this.clickedOnProperty.bind(this);
        this.showUserDetails = this.showUserDetails.bind(this);
    }

    showUserDetails(s,direct=false)
    {
        //alert("yes");
        if(!direct)
            window.open('/public-profiles/'+this.props.propertyInfo.user_id,'_blank');
        else 
            window.open('/public-profiles/'+s,'_blank');
    }



    componentDidMount()
    {
        /* let rthis = this;
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] = 
                                'JWT ' + sessionStorage.getItem('user-token');
        let searchData = { 'usertype' : this.props.user}
        axios.post(BASE_URL+'/get-questions',searchData)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log(response);
                if(response.status === 200){
                    //alert("User added successfully.");
                    try
                    {
                        let s = response.data;//JSON.parse(response.data);
                        if(s.code == '-1' )
                        {
                            if(s.error_type=='PROPERTY_BOOKED')
                            {
                                //alert("This property has been already booked");
                                rthis.setState({
                                    toShowDateError : true,
                                    isPropertyAvailable : 'N'
                                });
                                setTimeout(()=> {
                                    rthis.setState({
                                        toShowDateError : false
                                    })
                                },6000);
                            }
                            //alert("No results found for this search query.Please try again");
                        }
                        else if(s.code == '+1' && s.error_type=="NEW_BOOKING")
                        {
                                rthis.setState({
                                    isPropertyAvailable : 'A'
                                });
                                setTimeout(()=> {
                                    window.jQuery('.fullPageLoaderSuccessMessage').addClass('fullPageLoaderSuccessMessageOpen');
                                },200);
                                                                                        
                        }

                    }
                    catch(e)
                    {
                        console.log(e);
                    }
                }else{
                    
                }
            }).catch((error)=>{
                console.log(error);
            }); */
    }

    clickedOnProperty()
    {
        console.log(this.props);
        let ids = this.props.propertyInfo.uniqueid;
        let currentTime = new Date().getTime();
        let dateData = {fromTo: currentTime,fromTo2: (currentTime + ( (7 * 24 * 60 * 60 * 1000))) };
        try
        {   
            if(this.props.dateData.fromTo!='' && this.props.dateData.fromTo2!='')
            {
                dateData['fromTo'] = this.props.dateData.fromTo;
                dateData['fromTo2'] = this.props.dateData.fromTo2;
            } 
            if(!this.props.dateData.guests)
                dateData['guests'] = 2;
            else 
                dateData['guests'] = this.props.dateData.guests
        }
        catch(e)
        {
            console.log(e);
        } 
        window.open("/property-details/"+ids+"/"+new Date(dateData["fromTo"]).getTime()+"/"+new Date(dateData["fromTo2"]).getTime()+"/"+dateData['guests'],"_blank");
    }


    saveAnswer(f1,f2,f3)
    {
        console.log(f1 + f2 + f3);
        console.log(document.querySelector("textarea[data-qnans='"+f1+"']").value);
        var currentTextareavalue = document.querySelector("textarea[data-qnans='"+f1+"']").value

        /******************CALL TO SAVE THE GIVEN ANSWER ***************************************/

        axios.defaults.withCredentials = true;
        let u = {  questionid : f1, propertyID : f2 , askerid : f3  , questionanswer : currentTextareavalue }
        //axios.post(BASE_URL+'/save-answers',u,{headers: {Authorization:'JWT ' + sessionStorage.getItem('user-token')}})
        let authstring =  'JWT ' + sessionStorage.getItem('user-token');
            axios({
                method: 'POST',
                data : u,
                url: BASE_URL+'/save-answers',
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
                        if(s.code == '-1')
                        {
                            alert("Could not find user.Please try again");
                        }
                        else if(s.code == '+1')
                        {
                            alert("Answer updated successfully!");
                            
                        }

                    }
                    catch(e)
                    {
                        console.log(e);
                    }
                }else{
                     
                }
            });



        /************************************************************************************* */

    }


    render(){

        let extraData1 = false;
        let extraData2 = false;
        if(sessionStorage.getItem('user') && sessionStorage.getItem('trcker') && sessionStorage.getItem('login-type'))
        {
            if(sessionStorage.getItem('login-type')=='SELLER' && window.location.href.indexOf('/seller/bookings')!=-1)
            {
                extraData1 = true;
            }
        }

        if(sessionStorage.getItem('user') && sessionStorage.getItem('trcker') && sessionStorage.getItem('login-type'))
        {
            if(sessionStorage.getItem('login-type')=='TRAVELLER' && window.location.href.indexOf('/traveller/bookings')!=-1)
            {
                extraData2 = true;
            }
        }

        let data2 =  this.props.qndata;
        console.log(data2);
        let i2 = this.props.looper;

        let printerString  = ''
        if(this.props.usertype == 'SELLER')
        {
            let time =  new Date(parseInt(data2.askedAt));
            console.log(time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
            printerString = (
                <div className="qnBox col-lg-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                       <span className="askedat">
                    <i className="fa fa-user usrprofile" onClick={()=>this.showUserDetails(data2.askerid,true)} ></i>
                       <span className="askedat2"> {
                            //let time = new Date();
                            time.toLocaleString('en-US', {day:'numeric', month : 'numeric', year : 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
                            

                        }</span></span>
                    </div>
                    <div class="panel-body">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-12 msgbox">
                                <p key={i2} >{ data2.qnmessage} </p>
                            </div>
                            <div className="col-lg-8 msgansbox">
                                <textarea name="sqstx"  className="form-control" data-qnans={data2.questionid} >
                                {data2.qnanswer}
                                </textarea>
                            </div>
                            <div className="col-lg-3">
<button type="button"  onClick={() => this.saveAnswer(data2.questionid,data2.propertyID,data2.askerid)} className="btn btn-primary svbtn"  >Save Answer</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        else 
        {
            let time =  new Date(parseInt(data2.askedAt));
            //time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            console.log(time.toLocaleString('en-US', {day:'numeric', month : 'numeric', year : 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }));
            printerString = (
                <div className="qnBox col-lg-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                       <span className="askedat">
                    <i className="fa fa-user usrprofile" onClick={()=>this.showUserDetails(data2.askerid,true)} ></i>
                       <span className="askedat2"> {
                            
                            time.toLocaleString('en-US', {day:'numeric', month : 'numeric', year : 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })

                        }</span></span>
                    </div>
                    <div class="panel-body">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-12 msgbox">
                                <p key={i2} >Q: { data2.qnmessage} </p>
                            </div>
                            <div className="col-lg-12 msgansbox">
                                <div name="sqstx"  >
                                    <blockquote>{data2.qnanswer ? data2.qnanswer : 'This question is yet to be answered.'}</blockquote>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }

        return (printerString)
    }

}

export default QuestionAnswers
import React, { Component } from 'react';
import axios from 'axios';
import './AskQuestion.css'

import { connect } from 'react-redux';
import { BASE_URL } from '../../common/AppSettings/AppSettings';
import cookie from 'react-cookies';


class AskQuestion extends React.Component {

    constructor(props)
    {
        
        super(props);
        this.state = {

            fname1 : '',
            lname1 : '', 
            email1 : '',
            mobile1 : '',
            msg : '',
            propertyID : this.props.propertyIDV,
            isError : false

        }

        this.changeText = this.changeText.bind(this);
        this.askQn = this.askQn.bind(this);
        this.close = this.close.bind(this);
    }

    changeText(e)
    {
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    askQn()
    {
        let ot = this;
        let {fname1,lname1,email1,mobile1,msg} = {...this.state} ;
        console.log(fname1);
        this.setState({
            isError : false
        });
        if(fname1.trim() == '' )
        {
            this.setState({
                isError : true
            });
            setTimeout(()=>{
                this.setState({
                    isError : false
                });
            },5000)
        }
        else if(lname1.trim() == '' )
        {
            this.setState({
                isError : true
            });
            setTimeout(()=>{
                this.setState({
                    isError : false
                });
            },5000)
        }
        else if(email1.trim() == '' )
        {
            this.setState({
                isError : true
            });
            setTimeout(()=>{
                this.setState({
                    isError : false
                });
            },5000)
        }
        else if(mobile1.trim() == '' )
        {
            this.setState({
                isError : true
            });
            setTimeout(()=>{
                this.setState({
                    isError : false
                });
            },5000)
        }
        else if(msg.trim() == '' )
        {
            this.setState({
                isError : true
            });
            setTimeout(()=>{
                this.setState({
                    isError : false
                });
            },5000)
        }
        else 
        {
            this.setState({
                isError : false
            });


            /****************CALL API TO MAKE CALL TO SAVE THE FUNCTION IN THE MONGODB **************/

                    axios.defaults.withCredentials = true;                    
                    axios.defaults.headers.common['Authorization'] = 
                                'JWT ' + sessionStorage.getItem('user-token');
                    axios({
                        method: 'POST',
                        url: BASE_URL + '/ask-a-question',
                        headers: {Authorization:'JWT ' + sessionStorage.getItem('user-token')},
                        data: this.state,
                        })
                    .then(function (response) {
                        console.log(response);
                        //alert(response.status);
                        if(response.status == 200)
                        {
                            if(response.data.code == '-1')
                            {
                                alert("There was an error while saving the details. Please try again.");
                                document.location.reload();
                            }
                            else if(response.data.code == '+1')
                            {
                                window.jQuery(".customErrorLoader").html("<strong>Yay! </strong> You message was recorded successfully.");
                                //Close the Modal function passed by the parent component
                                //ot.props.closeModal();
                                window.jQuery(".customErrorLoader").addClass("customErrorLoaderShow");
                                window.setTimeout(()=> window.jQuery(".customErrorLoader").removeClass("customErrorLoaderShow"),6000);
                            }
                        }
                        else if(response.status == 401)
                        {
                            alert("You don't seem to be logged in.Please login and try again");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                       /*  if(error.response.status == 401)
                        {
                            window.userNotLoggedIn();
                        } */

                    });



            /************************************************************************************** */
        }
        
    }

    close()
    {
        this.props.closeModal();
    }



    render()
    {
        return (
            <div className="outer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 qnBox">
                                <h4 className="askQnModal">
                                    Ask Owner a Question
                                </h4>
                                <hr/>

                                <div class="form-group">
                                    <label htmlFor="exampleInputEmail1">First Name</label>
                                    <input type="text" class="form-control" id="fname1" name="fname1"  placeholder="First Name..." onChange={this.changeText} value={this.state.fname1} />                                    
                                </div>

                                <div class="form-group">
                                    <label htmlFor="exampleInputEmail1">Last Name</label>
                                    <input type="text" class="form-control" id="lname1" name="lname1"  placeholder="First Name..."  onChange={this.changeText}  value={this.state.lname1}/>                                    
                                </div>

                                <div class="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="text" class="form-control" id="email1" name="email1"  placeholder="E-mail address"  onChange={this.changeText}  value={this.state.email1} />
                                </div>

                                <div class="form-group">
                                    <label htmlFor="exampleInputEmail1">Mobile Number</label>
                                    <input type="text" class="form-control" id="mobile1" name="mobile1"  placeholder="Mobile number" onChange={this.changeText}  value={this.state.mobile1}  />
                                </div>

                                <div class="form-group">
                                    <textarea class="form-control" name="msg" id="msg" rows="4" placeholder="Message to the owner" onChange={this.changeText}  value={this.state.msg} ></textarea>
                                </div>

                                <button type="button" onClick={this.askQn}  className="btn btn-primary saveButton" >
                                    Ask A Question
                                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="button" onClick={this.close}  className="btn btn-danger saveButton" >
                                    Cancel
                                </button>

                            { this.state.isError &&  (<div class="alert alert-danger modalAlert" role="alert">
                                Error! Please fill in all the fields.
                            </div>) }


                          

                        </div>
                    </div>
                </div>
               
            </div>

        )
    }

}

const mapStateToProps = (state, props) => {
    console.log(state);
    return state;
  };
//export default HomePage;
export default connect(mapStateToProps)(AskQuestion);
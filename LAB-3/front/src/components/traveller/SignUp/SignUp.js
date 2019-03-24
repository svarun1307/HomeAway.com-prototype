import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import LoginHeader from '../../common/LoginHeader/LoginHeader';
import {Link} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { BASE_URL } from '../../common/AppSettings/AppSettings';



import { graphql, compose } from 'react-apollo';
//import { getAuth } from '../queries/queries';
import { addUserMutation } from '../../../mutation/mutations';


const smallerHeadingSingup = {
    color: 'rgb(102,102,102)',
    fontSize: '18px'
}

const loginText = {
    color: '#666',
    fontSize: '22px',
    fontWeight: '300',
    textAlign: 'left',
    marginBottom: '5px'
}

const loginFormStyle = {
    marginTop: '20px'
}

const forgotPasswordText = {
    color: '#2a6ebb',
    textDecoration: 'none',
    fontSize: '14px',
    textAlign: 'left',
    display: 'block',
    marginBottom: '15px',
    marginTop: '15px'
}


const noPaddingRight = {
    paddingRight : '0px'
}

const noPaddingLeft = {
    paddingLeft : '0px'
}

const lowerMargin = {
    marginBottom : '100px'
}

class TravellerSignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstnames : '',
            lastnames : '',
            signupemails : '',
            signuppassword : '',

            open: false,
            vertical: 'bottom',
            horizontal: 'right',
            alertMessage : ''
        }
        this.changeText = this.changeText.bind(this);
        this.signMeUp = this.signMeUp.bind(this);
    }

    changeText(e)
    {
        let s = e.target.id;
        try
        {
            this.setState({
                [e.target.id] : e.target.value
            })
        }
        catch(e)
        {
            console.log(e);
        }
    }

    componentWillReceiveProps(pr)
    {
        console.log(pr);
        console.log("YESSS")
    }


    signMeUp()
    {
        let sCopy = this.state;
        let allValues = Object.values(sCopy);
        console.log(allValues);
        if(sCopy["firstnames"]=='' || sCopy["lastnames"]==''  || sCopy["signupemails"]=='' || sCopy["signuppassword"]=='' )
        {
            this.setState({ open: true, alertMessage : 'Please fill in all fields to proceed.'});
            setTimeout(() => {
                this.setState({ open: false , alertMessage : ''});
            }, 5000)
            return false;
        }
        let tsc = this.props.addUserMutation({
            variables: {
                firstnames: this.state.firstnames,
                lastnames : this.state.lastnames,
                signupemails : this.state.signupemails,
                signuppassword : this.state.signuppassword,
                acctype : "TRAVELLER"
             
            }
            //refetchQueries: [{ query: getBooksQuery }]
        });
        //console.log(tsc);
        tsc.then(function(s){
            if(s)
            {
                window.jQuery("#exampleModalLabel").html("Success!");
                window.jQuery("#exampleModal .modal-body").html("You have registered successfully to HomeAway!<br/>Please login to proceed.");
                window.jQuery("#exampleModal .modal-footer").html('<button type="button" class="btn btn-success" onclick="gotoLogin(\'T\')" >Proceed</button>');

                window.jQuery('#exampleModal').modal('show');
            }
        }).catch(function(e){
            console.log(e);
            this.setState({ open: true, alertMessage : 'An Unexpected error occurs.Please try again.'});
            setTimeout(() => {
                this.setState({ open: false , alertMessage : ''});
                document.location.reload();
            }, 5000);
        })
        console.log(this.props);
       /*  axios.defaults.withCredentials = true;
        let sCopy = this.state;
        let allValues = Object.values(sCopy);
        console.log(allValues);
        if(sCopy["firstnames"]=='' || sCopy["lastnames"]==''  || sCopy["signupemails"]=='' || sCopy["signuppassword"]=='' )
        {
            this.setState({ open: true, alertMessage : 'Please fill in all fields to proceed.'});
            setTimeout(() => {
                this.setState({ open: false , alertMessage : ''});
            }, 5000)
            return false;
        }
        sCopy["loginType"] = "TRAVELLER";
        //axios.post(BASE_URL+'/user-signup',sCopy)
            let authstring =  'JWT ' + sessionStorage.getItem('user-token');
            axios({
                method: 'POST',
                data : sCopy,
                url: BASE_URL+'/user-signup',
                headers: { 'Authorization': authstring}
            })
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log(response);
                if(response.status === 200){
                    //alert("User added successfully.");
                    try
                    {
                        console.log(response.data);
                        let s = response.data;//JSON.parse(response.data);
                        if(s["code"]=="-1")
                        {
                            if(s["error_type"]=="NAMES_ERROR")
                            {
                                this.setState({ open: true, alertMessage : 'Please fill first and last names.'});
                                setTimeout(() => {
                                    this.setState({ open: false , alertMessage : ''});
                                }, 5000);
                            }
                            else if(s["error_type"]=="EMAIL_ERROR")
                            {
                                this.setState({ open: true, alertMessage : 'Please enter a valid email address.'});
                                setTimeout(() => {
                                    this.setState({ open: false , alertMessage : ''});
                                }, 5000);
                            }
                            else if(s["error_type"]=="PASSWORD_ERROR")
                            {
                                this.setState({ open: true, alertMessage : 'Please enter a password with upper,lower case characters and a number and minimum of 8 characters.'});
                                setTimeout(() => {
                                    this.setState({ open: false , alertMessage : ''});
                                }, 5000);
                            }
                            else if(s["error_type"]=="USER_EXISTS")
                            {
                                this.setState({ open: true, alertMessage : 'A User with this email already exists. Please enter the correct password.'});
                                setTimeout(() => {
                                    this.setState({ open: false , alertMessage : ''});
                                }, 5000);
                            }
                            else if(s["error_type"]=="DB_ERROR")
                            {
                                this.setState({ open: true, alertMessage : 'An Unexpected error occurs.Please try again.'});
                                setTimeout(() => {
                                    this.setState({ open: false , alertMessage : ''});
                                    document.location.reload();
                                }, 5000);
                            }
                        }
                        else if(s["code"]=="+1")
                        {
                            window.jQuery("#exampleModalLabel").html("Success!");
                            window.jQuery("#exampleModal .modal-body").html("You have registered successfully to HomeAway!<br/>Please login to proceed.");
                            window.jQuery("#exampleModal .modal-footer").html('<button type="button" class="btn btn-success" onclick="gotoLogin(\'T\')" >Proceed</button>');

                            window.jQuery('#exampleModal').modal('show')
                        }
                    }
                    catch(e)
                    {
                        console.log(e);
                    }
                }else{
                     
                }
            }); */
    }


    render() {
        const { vertical, horizontal, open } = this.state;
        return (
            <div className="fullHeight">
                <LoginHeader />
                <div className="container loginContainer fullHeight">
                    <div className="loginHeader row justify-content-md-center ">
                        <div className="col col-lg-7 text-center" style={lowerMargin}>
                            <h1 className="mg-from-top loginHeadings">Sign up for HomeAway</h1>
                            <h6 className="smaller" style={smallerHeadingSingup} >Already have an account? <Link className="signupref" href="javascript:void(0)" to="/traveller-login"> Login</Link> </h6>
                            <div className="col-lg-8 offset-lg-2 ">
                                <div className="loginBox">
                                    <form style={loginFormStyle}>
                                    <div className="input-group signupMails">
                                            <div className="col-lg-6 noPaddingleft">
                                                <input type="email" className="form-control commonInputs" id="firstnames" name="firstnames" placeholder="First Name" value={this.state.firstnames} onChange={this.changeText} />
                                            </div>
                                            <div className="col-lg-6 noPaddingRight">
                                                <input type="email" className="form-control commonInputs" id="lastnames" name="lastnames" placeholder="Last Name" value={this.state.lastnames} onChange={this.changeText}  />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control commonInputs" id="signupemails" name="signupemails" placeholder="Email address" value={this.state.signupemails} onChange={this.changeText}  />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control commonInputs" id="signuppassword" name="signuppassword" placeholder="Password" value={this.state.signuppassword} onChange={this.changeText}  />

                                        </div>
                                        

                                        <button type="button" className="btn btn-primary btn-lg col-lg-8 loginButton " onClick={this.signMeUp} >Sign Me Up</button>

                                    </form>
                                    <div className="row orcont">
                                    <div className="col-lg-5 col-5" style={noPaddingRight}>
                                        <hr/>
                                    </div>
                                    <div className="col-lg-2 col-2 orbox">Or
                                    </div>
                                    <div className="col-lg-5 col-5" style={noPaddingLeft}>
                                        <hr/>
                                    </div>
                                    </div>

                                    <div className="facebook-box">
                                        <button type="button" className="btn btn-lg col-lg-8  fbButton"><i className="fa fa-facebook"></i> Log in with Facebook</button>
                                    </div>

                                    <div className="google-box">
                                        <button type="button" className="btn btn-lg col-lg-8  gButton"><span className="innerSpan"><img src={require('../../../images/google-color-g.svg')} alt="HomeAway" /></span> Log in with Google</button>
                                    </div>
                                    <small className="dont-post" >We don't post anything without your permission.</small>
                                    <small className="dont-post">
                                    By creating an account you are accepting our <a href="javascript:void(0)">Terms and Condition</a>s and <a href="javascript:void(0)">Privacy Policy.</a>

                                    </small>
                                    <br/>
                                </div>
                            </div>

                            <small className="loginFooter">
                            Use of this Web site constitutes acceptance of the HomeAway.com <a href="javascript:void(0)">Terms and Conditions</a> and <a href="javascript:void(0)">Privacy Policy.</a>

<br/>©2018 HomeAway. All rights reserved.
                            </small>

                        </div>

                    </div>

                </div>

                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.alertMessage}</span>}
                />

            </div>

        )
    }
}

//export default TravellerSignUp;

export default compose(
    //graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addUserMutation, { name: "addUserMutation" })
)(TravellerSignUp);
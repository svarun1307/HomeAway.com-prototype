import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import LoginHeader from '../../common/LoginHeader/LoginHeader';
import {Link} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../common/AppSettings/AppSettings';

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
    marginTop: '25px'
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

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginemail : '',
            loginpassword : '',
            goToDashboard : false,

            open: false,
            vertical: 'bottom',
            horizontal: 'right',
            alertMessage : '',
            userId : ''
        }
        this.checkLogin = this.checkLogin.bind(this);
        //this.checkLogin =  this.checkLogin.bind(this);
        this.changeText = this.changeText.bind(this);
    }

    checkLogin()
    {
        console.log(this.state);
        axios.defaults.withCredentials = true;
        let sCopy = this.state;
        if(sCopy["loginemail"]=='' || sCopy["loginpassword"]=='')
        {
            this.setState({ open: true, alertMessage : 'Please fill in all fields to login.'});
            setTimeout(() => {
                this.setState({ open: false , alertMessage : ''});
            }, 5000)
            return false;
        }
        sCopy["loginType"] = "SELLER";
        axios.post(BASE_URL+ '/login-validate',sCopy)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log(response);
                if(response.status === 200){
                    //alert("User added successfully.");
                    try
                    {
                        let s = response.data;//JSON.parse(response.data);
                        if(s["code"]=="-1")
                        {
                            if(s["error_type"]=="INVALID")
                            {
                                this.setState({ open: true, alertMessage : 'This seems to be an invalid password.Please try again.'});
                                setTimeout(() => {
                                    this.setState({ open: false , alertMessage : ''});
                                }, 5000)
                                return false;
                            }
                            else if(s["error_type"]=="EMAIL_NOT_EXIST")
                            {
                                this.setState({ open: true, alertMessage : 'This email is not registered with us a seller. Please try again.'});
                                setTimeout(() => {
                                    this.setState({ open: false , alertMessage : ''});
                                }, 5000)
                                return false;
                            }
                            else if(s["error_type"]=="BLANK_ERROR")
                            {
                                this.setState({ open: true, alertMessage : 'Please enter all fields to login.'});
                                setTimeout(() => {
                                    this.setState({ open: false , alertMessage : ''});
                                }, 5000)
                                return false;
                            }
                            else if(s["error_type"]=="EMAIL_ERROR")
                            {
                                this.setState({ open: true, alertMessage : 'Please enter a valid email address.'});
                                setTimeout(() => {
                                    this.setState({ open: false , alertMessage : ''});
                                }, 5000)
                                return false;
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
                            sessionStorage.setItem("userID",s["userID"]);
                            this.setState({
                                loginemail : "",
                                loginpassword : "",
                                goToDashboard : true,
                                userId : s["userID"]
                            });


                            /* window.jQuery("#exampleModalLabel").html("Success!");
                            window.jQuery("#exampleModal .modal-body").html("You have successfully logged in.");
                            window.jQuery("#exampleModal .modal-footer").html('<button type="button" class="btn btn-success" onclick="goToDashboard()" >Proceed</button>');

                            window.jQuery('#exampleModal').modal('show') */
                        }
                    }
                    catch(e)
                    {
                        console.log(e);
                    }
                }else{
                     
                }
            });
    }

    changeText(e)
    {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    render() {
        const { vertical, horizontal, open } = this.state;
        let goTo = null;
        if(this.state.goToDashboard)
        {
            goTo = ( <Redirect to="/seller/dashboard" /> );
        }

        return (
            <div className="fullHeight">
                {
                    goTo 
                }
                <LoginHeader />
                <div className="container loginContainer fullHeight">
                    <div className="loginHeader row justify-content-md-center ">
                        <div className="col col-lg-5 text-center" style={lowerMargin}>
                            <h1 className="mg-from-top loginHeadings">Log in to HomeAway</h1>
                            <h6 className="smaller" style={smallerHeadingSingup} >Need an account? <Link className="signupref" href="javascript:void(0)" to="/seller-sign-up">Signup</Link></h6>
                            <div className="col-lg-8 offset-lg-2 ">
                                <div className="loginBox">
                                    <p style={loginText} >Account Login</p>
                                    <hr />
                                    <form style={loginFormStyle}>
                                        <div className="form-group">
                                            <input type="email" className="form-control commonInputs" id="loginemail" name="loginemail" placeholder="Email address"  value={this.state.loginemail} onChange={this.changeText}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control commonInputs" id="loginpassword" name="loginpassword" placeholder="Password" value={this.state.loginpassword} onChange={this.changeText} />

                                        </div>
                                        <a style={forgotPasswordText} href="javascript:void(0)" >Forgot Password?</a>

                                        <button type="button" className="btn btn-primary btn-lg btn-block loginButton" onClick={this.checkLogin} >Log In</button>

                                        <div className="form-check text-left loggedin-check">
                                            <input className="form-check-input" type="checkbox" value="" id="signedIn" />
                                            <label className="form-check-label" htmlFor="signedIn">
                                                Keep me signed in
  </label>
                                        </div>

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
                                        <button type="button" className="btn btn-lg btn-block fbButton"><i className="fa fa-facebook"></i> Log in with Facebook</button>
                                    </div>

                                    <div className="google-box">
                                        <button type="button" className="btn btn-lg btn-block gButton"><span className="innerSpan"><img src={require('../../../images/google-color-g.svg')} alt="HomeAway" /></span> Log in with Google</button>
                                    </div>
                                    <small className="dont-post" >We don't post anything without your permission.</small>
                                    

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

export default Login;
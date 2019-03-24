import React, { Component } from 'react';
import axios from 'axios';
import './WebsiteHeader.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {getLoginDetails} from '../../../actions/index'
import { connect } from 'react-redux';
import { BASE_URL } from '../../common/AppSettings/AppSettings';

class WebsiteHeader extends React.Component {

    constructor(props)
    {
        super(props);
        console.log("Header props",this.props);
        this.state = {
            'firstname' : 'Welcome Guest'
        }
    }

    componentDidMount()
    {
        this.props.dispatch(getLoginDetails());
        console.log(this.props);
        console.log("IN WEBSITE HEADER",this.props);
        let t = this;
        try
        {
            console.log(Object.keys(this.props.loginDetails))
            if(Object.keys(this.props.loginDetails).length > 0)
            {
                t.setState({
                    'firstname' : this.props.loginDetails.firstname
                });
                localStorage.setItem('WebsiteHeaderProps',JSON.stringify(this.props.loginDetails));
            }
            else 
            {
                
            }

        }
        catch(e)
        {
            console.log(e);
        }
    }

    userLogoutWeb()
    {
        let m = window.confirm("Are you sure you want to logout?");
        if(m)
        {
            let _t = this;
            /*************SUBMITTING FORM TO THE SERVER***************** */
            axios.defaults.withCredentials = true;
            axios({
                method: 'POST',
                url: BASE_URL+ '/logoutUser'
                })
            .then(function (response) {
                if(response.status == 200)
                {
                    if(response.data == '-1')
                    {
                        alert("There was an error while performing the operation. Please try again.");
                        document.location.reload();
                    }
                    else if(response.data == '+1')
                    {                    
                        /* this.history.push({
                            pathname: '/',
                        }); */
                        sessionStorage.clear();
                        window.location.href = '/';
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    render()
    {
        let classString = "headerDB navbar navbar-expand-lg navbar-light bg-light";
        let data = this.props.headerData;   
        let imagePath = '';
        if(data.image =="blue")
            imagePath = require('../../../images/logo-login.svg');
        else 
            imagePath = require('../../../images/logo-bceheader-white.svg');

        //Adding and Removing class based on the required page


        if(data.headerColor == "black")
            classString += " onlyHEADERBLACK ";
        else 
            classString += " onlyHEADERWHITE ";

        
        /*************CHECKING LOGIN TYPE ***************/

        let loginType = '';
        
        if(sessionStorage.getItem('user') && sessionStorage.getItem('trcker') && sessionStorage.getItem('login-type')=='TRAVELLER')
        {
            loginType  = sessionStorage.getItem('login-type');
        }
        else if(sessionStorage.getItem('user') && sessionStorage.getItem('trcker') && sessionStorage.getItem('login-type')=='SELLER')
        {
            loginType  = sessionStorage.getItem('login-type');
        } 
        console.log(loginType);



        return (
            <div>
                <nav className={classString} >
                    <Link className="navbar-brand" href="javascript:void(0)" to="/"><img className="leftIMG" src={imagePath} /></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            
                            
                            <li className="form-control listBoxSide"><img className="flagImage" src={require('../../../images/american-flag-small.gif')} /></li>
                            <li className="form-control listBoxSide">Trip Boards</li>
                            <li className="form-control nav-item dropdown listBoxSide">
                                
                                {
                                    (loginType == '') ? (<span><a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Login
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/traveller-login" >Traveller Login</Link>
                                        <Link className="dropdown-item" to="/seller-login"  >Owner Login</Link>
                                        
                                    </div></span>) : (loginType =='TRAVELLER') ? (<div>
                                        <a className="nav-link dropdown-toggle userNAMESHOWN" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.props.loginDetails.firstname}
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link className="dropdown-item" to="/traveller/dashboard" ><i class="fas fa-home headerICONS"></i>&nbsp;My Dashboard</Link>
                                            <Link className="dropdown-item" to="/traveller/bookings" ><i class="fas fa-plane-departure headerICONS"></i>&nbsp;My Trips</Link>
                                            <Link className="dropdown-item" to="/traveller/user-profile"  ><i class="fas fa-user headerICONS"></i>&nbsp;Profile</Link>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" onClick={this.userLogoutWeb}  ><i class="fas fa-sign-out-alt headerICONS"></i>&nbsp;Logout</a>
                                            
                                        </div></div>
                                    ) : (<div>
                                        <a className="nav-link dropdown-toggle userNAMESHOWN" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.props.loginDetails.firstname}
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link className="dropdown-item" to="/seller/dashboard" ><i class="fas fa-home headerICONS"></i>&nbsp;My Dashboard</Link>
                                            <Link className="dropdown-item" to="/seller/add-property" ><i class="fas fa-plus headerICONS"></i>&nbsp;Add Property</Link>
                                            <Link className="dropdown-item" to="/seller/bookings" ><i class="fas fa-hand-holding-usd headerICONS"></i>&nbsp;My bookings</Link>
                                            <Link className="dropdown-item" to="/seller/user-profile"  ><i class="fas fa-user headerICONS"></i>&nbsp;Profile</Link>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" onClick={this.userLogoutWeb}  ><i class="fas fa-sign-out-alt headerICONS"></i>&nbsp;Logout</a>
                                            
                                        </div></div>
                                    )
                                }
                                
                                
                            </li>

                             <li className="form-control nav-item dropdown listBoxSide">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Help
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="javascript:void(0)">Visit Help Center</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="javascript:void(0)"><b>Traveller</b></a>
                                    <a className="dropdown-item" href="javascript:void(0)">How It Works?</a>
                                    <a className="dropdown-item" href="javascript:void(0)">Security Center</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="javascript:void(0)"><b>HomeOwners</b></a>
                                    <a className="dropdown-item" href="javascript:void(0)">How It Works?</a>
                                    <a className="dropdown-item" href="javascript:void(0)">List Your Property</a>
                                    <a className="dropdown-item" href="javascript:void(0)">Community</a>
                                    <a className="dropdown-item" href="javascript:void(0)">Discovery Hub</a>

                                    {/*<div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>*/}
                                </div>
                            </li>
                        
                                    
                            <button className="btn btn-outline-success my-2 my-sm-0 listPropButton listBoxSide customButton" type="button"><Link to="/seller/add-property" target="_blank">List your property</Link></button>
                            <img className="listBoxSide" src={require('../../../images/birdhouse-bceheader.svg')} />
                        </form>
                    </div>
                    </nav>

            </div>
        )
    }

}

WebsiteHeader.defaultProps = {
    loginDetails : {
        firstname : ''
    }
  };

//export default WebsiteHeader;
const mapStateToProps = (state, props) => {
    console.log(state);
    return state;
  };
//export default HomePage;
export default connect(mapStateToProps)(WebsiteHeader);
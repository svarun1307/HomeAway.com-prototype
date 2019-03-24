import React, { Component } from 'react';
import axios from 'axios';
import './PublicProfiles.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import WebsiteHeader from '../WebsiteHeader/WebsiteHeader';
import { BASE_URL } from '../../common/AppSettings/AppSettings';


class PublicProfiles extends React.Component {

    userID;
    constructor(props)
    {
        super(props);
        console.log(this.props);
        this.state = {
            userData : '',
            urlImage : require('../../../images/img.jpg'),
        }

    }
    
    componentDidMount()
    {
        this.userID = this.props.match.params.id;
        let _s = this;
        axios.defaults.withCredentials = true;
        //(BASE_URL+'/public-profiles/'+this.userID)
            let authstring =  'JWT ' + sessionStorage.getItem('user-token');
            axios({
                method: 'GET',
                url: BASE_URL+'/public-profiles/'+this.userID,
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
                            alert("No results found for this user.Please try again");
                        }
                        else if(s.code == '+1')
                        {
                            let imgdata = response.data.error_type[0]["CIM"];
                            
                            if(imgdata !='')
                            {
                                _s.setState({
                                    urlImage : imgdata,//'data:image/jpg;base64, ' + imgdata,
                                    userData : response.data.error_type
                                })
                            }
                            else 
                            {
                                _s.setState({
                                    userData : response.data.error_type
                                })
                            }

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

    render()
    {
        let dataObj = {
            "image" : "blue",
            "headerBackground" :  "white",
            "headerColor" : "black",
            "loggedInNeeded" : true,
        }

        console.log(this.state);
       // let userName = this.state.userData[0].name;
       // alert(userName);
        
       let userName = '';
       let usercity = '';
       let userCountry = '';
       let userEmail = '';
       let userex1 = '';
       let usergender = '';
       let userhometown = '';
       let langs = '';
       let firstname = '';
       let phone = '';
       let userid = '';
       let school = '';
       let userabout = '';
       let memberSince = '';

        try{
            if(this.state.userData!='')
            {
                userName = this.state.userData[0].name;
                usercity = this.state.userData[0].city;
                userCountry = this.state.userData[0].country;
                userEmail = this.state.userData[0].email;
                userex1 = this.state.userData[0].ex1;
                usergender =  this.state.userData[0].gender;
                userhometown = this.state.userData[0].hometown;
                firstname =  this.state.userData[0].name;
                langs = this.state.userData[0].languages;
                phone = this.state.userData[0].phone
                school =  this.state.userData[0].school;
                userid =  this.state.userData[0].user_random;
                memberSince = this.state.userData[0].joinedon;
                userabout = this.state.userData[0].about

            }
        }
        catch(e)
        {
            console.log(e);
        }

        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let jn = memberSince;
                        jn = parseInt(jn);
                        let jn1 = new Date(jn).getFullYear();
                        let jn2 = months[new Date(jn).getMonth()];
        memberSince = " "+jn2+" "+jn1;

        return (
            <div className="ccv">
                <WebsiteHeader headerData={dataObj} />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                        </div>
                        <div className="col-lg-3 leftProfileBox actorsDiv">
                            <img src={this.state.urlImage} alt='HomeAway' className="profileImage" />
                            <hr/>
                            <h3 className="section-header">Verifications</h3>
                                <div className="trow">
                                    Email Address <span className="vertext">Verified<i className="material-icons">check</i></span>
                                </div>
                                
                                <div className="trow">
                                    Mobile Number <span className="vertext">Verified<i className="material-icons">check</i></span>
                                </div>
                        </div>
                        <div className="col-lg-7 rightProfileBox actorsDiv">
                            <div className="userName">
                                <div className="intro">Hi, I'm <span className="userNameDynamic">{firstname}</span></div>
                                <div className="memberSince">Member Since {memberSince}</div>
                            </div>

                            <div className="col-lg-12 aboutme">
                                    <h3>About Me</h3>

                            </div>


                            <div className="row col-lg-12 userINDValues">
                                <div className="col-lg-12 rightuservalues">
                                    {userabout}
                                </div>

                            </div>
                            <hr/>
                            <div className="row col-lg-12 userINDValues">
                                <div className="col-lg-3 rightuservalues">
                                    Email
                                </div>
                                <div className="col-lg-8 rightuservalues">
                                    {userEmail?userEmail:'-'}
                                </div>

                            </div>

                             <div className="row col-lg-12 userINDValues">
                                <div className="col-lg-3 rightuservalues">
                                    Phone
                                </div>
                                <div className="col-lg-8 rightuservalues">
                                    {phone?phone:'-'}
                                </div>

                            </div>


                            <div className="row col-lg-12 userINDValues">
                                <div className="col-lg-3 rightuservalues">
                                    City & Country:
                                </div>
                                <div className="col-lg-8 rightuservalues">
                                    {usercity?usercity:'-'}{userCountry?','+userCountry:'-'} 
                                </div>

                            </div>

                             <div className="row col-lg-12 userINDValues">
                                <div className="col-lg-3 rightuservalues">
                                    Languages Spoken
                                </div>
                                <div className="col-lg-8 rightuservalues">
                                    {langs?langs:'-'}
                                </div>

                            </div>


                             <div className="row col-lg-12 userINDValues">
                                <div className="col-lg-3 rightuservalues">
                                    Gender
                                </div>
                                <div className="col-lg-8 rightuservalues">
                                    {usergender?usergender:'-'}
                                </div>

                            </div>


                         <div className="row col-lg-12 userINDValues">
                                <div className="col-lg-3 rightuservalues">
                                    School
                                </div>
                                <div className="col-lg-8 rightuservalues">
                                    {school?school:'-'}
                                </div>

                            </div>

                         <div className="row col-lg-12 userINDValues">
                                <div className="col-lg-3 rightuservalues">
                                    HomeTown
                                </div>
                                <div className="col-lg-8 rightuservalues">
                                    {userhometown?userhometown:'-'}
                                </div>

                            </div>


                         <div className="row col-lg-12 userINDValues">
                                <div className="col-lg-3 rightuservalues">
                                    User ID
                                </div>
                                <div className="col-lg-8 rightuservalues">
                                    {userid?userid:'-'}
                                </div>

                            </div>


                            
                            

                        </div>
                    </div>
                    
                </div>




            </div>
        )
    }

}

export default PublicProfiles;
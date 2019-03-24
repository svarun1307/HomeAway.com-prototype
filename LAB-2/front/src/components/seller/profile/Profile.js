import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import './Profile.css';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import PropTypes, { array } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MaskedInput from 'react-text-mask';
import Snackbar from '@material-ui/core/Snackbar';
import { BASE_URL } from '../../common/AppSettings/AppSettings';

function TextMaskCustom(props) 
{
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            urlImage : require('../../../images/img.jpg'),
            userFname : '',
            userLname : '',
            userabout : '',
            userCity : '',
            userCountry : '',
            userCompany : '',
            memberSince : '',
            userSchool : '',
            userHometown : '',
            userLang : '',


            textmask: '(  )    -    ',
            gender : '',
            open: false,
            vertical: 'bottom',
            horizontal: 'right',
            alertMessage : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.changeText = this.changeText.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
    }

    viewProfile()
    {
        console.log(this.state.userRandom);
        window.open('/public-profiles/'+this.state.userRandom,'_blank');
    }



    componentDidMount()
    {
         /*************SUBMITTING FORM TO THE SERVER***************** */
         const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
         let m = this;
         axios.defaults.withCredentials = true;
         axios({
             method: 'GET',
             url: BASE_URL + '/userDetails',
             headers: {Authorization:'JWT ' + sessionStorage.getItem('user-token')}
             })
         .then(function (response) {
             console.log(response);
             if(response.status == 200)
             {
                 if(response.data.code == '-1')
                 {
                     if(response.data.error_type=="NO_USER")
                     {
                        this.setState({ open: true, alertMessage : "This user doesn't exist in our records. Please login and try again."});
                        setTimeout(() => {
                            this.setState({ open: false , alertMessage : ''});
                        }, 5000)
                        return false;
                         
                     }
                     else if(response.data.error_type=="LOGIN_ERROR")
                     {
                        this.setState({ open: true, alertMessage : "An unexpected error occurred. Please try again."});
                        setTimeout(() => {
                            this.setState({ open: false , alertMessage : ''});
                        }, 5000)
                        return false;
                     }
                     //document.location.reload();
                 }
                 else if(response.data.code == '+1')
                 {
                     try
                     {
                        let x = response.data.error_type;
                        console.log(x);
                        let jn = x["joinedon"];
                        jn = parseInt(jn);
                        let jn1 = new Date(jn).getFullYear();
                        let jn2 = months[new Date(jn).getMonth()];
                        
                        m.setState({
                            userFname : x["name"],
                            userLname : x["ex1"],
                            userabout : x["about"],
                            userCity : x["city"],
                            userCountry : x["country"],
                            userCompany : x["company"],
                            userSchool : x["school"],
                            userHometown : x["hometown"],
                            userLang : x["languages"],
                            userRandom  : x["user_random"],
                            memberSince : ("Member Since "+jn2+" "+jn1),
                            gender : x["gender"],
                             
                        });
                        if(x["phone"] != '')
                        {
                            m.setState({
                                textmask : x["phone"]
                            })
                        }
                        if(x["fullBaseIMG"]!="")
                        {
                            //console.log(x["fullBaseIMG"])
                            m.setState({
                                urlImage : x["fullBaseIMG"]//'data:image/jpg;base64, ' + x["fullBaseIMG"]
                            })
                        }
                     }
                     catch(e)
                     {
                         console.log(e);
                     }
                     

                 }
             }
         })
         .catch(function (error) {
             console.log(error);
         });

     /*********************************************************** */
    }

    editUserPhoto()
    {
        document.getElementById("uploadSelect").click();
    }

    updateProfile()
    {
        let sCopy = this.state;
        let _t = this;
        if(sCopy["userFname"]=='' || sCopy["userLname"]=='')
        {
             
            this.setState({ open: true, alertMessage : 'Please enter a valid first and last name.'});
                setTimeout(() => {
                    this.setState({ open: false , alertMessage : ''});
                }, 5000)
            return false;
        }
        else 
        {
            console.log(this.state);
            let dx = document.getElementById("uploadSelect").files;
            if(dx.length==0)
            {   
                    /*************SUBMITTING FORM TO THE SERVER***************** */
                    axios.defaults.withCredentials = true;
                    axios({
                        method: 'POST',
                        url: BASE_URL + '/updateProfileWithoutImage',
                        data: sCopy,
                        config: { headers: {Authorization:'JWT ' + sessionStorage.getItem('user-token')}},
                        headers: {Authorization:'JWT ' + sessionStorage.getItem('user-token')}
                        })
                    .then(function (response) {
                        if(response.status == 200)
                        {
                            if(response.data.code == '-1')
                            {
                                alert("There was an error while saving the details. Please try again.");
                                document.location.reload();
                            }
                            else if(response.data.code == '+1')
                            {
                                sessionStorage.setItem('firstname',_t.userFname);
                                sessionStorage.setItem('lastname',_t.userLname);
                                _t.setState({ open: true, alertMessage : 'Success! Your profile was updated.'});
                                    setTimeout(() => {
                                        _t.setState({ open: false , alertMessage : ''});
                                    }, 5000)
                                return false;
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else 
            {
                    var fd = new FormData();
                    var filesList = document.getElementById("uploadSelect").files;
                    for(var z=0 ; z< filesList.length ; z++)
                        fd.append("uploadSelect",filesList[z]);
                    for ( var key in sCopy ) {
                        fd.append(key, sCopy[key]);
                    }       
                    /*************SUBMITTING FORM TO THE SERVER***************** */
                        axios.defaults.withCredentials = true;
                        axios({
                            method: 'POST',
                            url: BASE_URL +'/updateProfileWithImage',
                            data: fd,
                            config: { headers: {'Content-Type': 'multipart/form-data' ,Authorization:'JWT ' + sessionStorage.getItem('user-token')}},
                            headers: {'Content-Type': 'multipart/form-data' ,Authorization:'JWT ' + sessionStorage.getItem('user-token')}
                        })
                        .then(function (response) {
                            if(response.status == 200)
                            {
                                if(response.data.code == '-1')
                                {
                                    alert("There was an error while saving the details. Please try again.");
                                    //document.location.reload();
                                }
                                else if(response.data.code == '+1')
                                {
                                    sessionStorage.setItem('firstname',_t.userFname);
                                    sessionStorage.setItem('lastname',_t.userLname);
                                    _t.setState({ open: true, alertMessage : 'Success! Your profile was updated.'});
                                    setTimeout(() => {
                                        //document.location.reload();
                                        _t.setState({ open: false , alertMessage : ''});
                                        window.location.reload();
                                    }, 5000)
                                return false;
                                }
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            
                    //});
        }
    }
}

    changeText(e)
    {
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    handleChange2 = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };


    render() {
        const { textmask } = this.state;
        const { vertical, horizontal, open } = this.state;
        if(!this.state.urlImage)
        {
            this.setState({
                urlImage : require('../../../images/img.jpg')
            }) // =  require('../../../images/img.jpg') ;
        }
        return (
            <div className="container containerBox">
                <div className="imageHolder" >
                    <img className="roundImage" onClick={this.editUserPhoto} src={this.state.urlImage} />
                    <div className="editButton" onClick={this.editUserPhoto} >
                        <i className="material-icons">edit</i>
                    </div>
                </div>
                <div className="extraDetails">
                    <h2 className="userDBName">{this.state.userFname} {this.state.userLname}</h2>
                    <p className="userDBName2" >{this.state.memberSince}</p>
                </div>

                <div className="container">
                    <div className="row movetop">
                        <div className="col-lg-8">
                            <div className="upperStatsLeft">
                            <h3 class="section-header">
                                Profile information
                            </h3>
                                {/***********USER NAME ***************/}
                                <div>
                                    <TextField
                                            id="userFname"
                                            label="First Name"
                                            onChange = {this.changeText}
                                            className="inputTextForForm"
                                            margin="normal"
                                            value = {this.state.userFname}
                                        />
                                </div>

                                {/***********USER NAME ***************/}
                                <div>
                                    <TextField
                                            id="userLname"
                                            label="Last Name"
                                            onChange = {this.changeText}
                                            className="inputTextForForm"
                                            margin="normal"
                                            value = {this.state.userLname}
                                        />
                                </div>

                                {/***********ABOUT ME ***************/}
                                <div  >
                                    <TextField
                                            id="userabout"
                                            label="About Me"
                                            multiline
                                            rows="4"
                                            value = { this.state.userabout}
                                            className="inputTextForForm"
                                            margin="normal"
                                            variant="filled"
                                            onChange = {this.changeText}
                                    />
                                </div>

                                {/***********USER city ***************/}
                                <div>
                                    <TextField
                                            id="userCity"
                                            label="City"
                                            onChange = {this.changeText}
                                            className="inputTextForForm"
                                            margin="normal"
                                            value = {this.state.userCity}
                                        />
                                </div>

                                {/***********USER city ***************/}
                                <div>
                                    <TextField
                                            id="userCountry"
                                            label="Country"
                                            onChange = {this.changeText}
                                            className="inputTextForForm"
                                            margin="normal"
                                            value = {this.state.userCountry}
                                        />
                                </div>

                                {/***********USER company ***************/}
                                <div>
                                    <TextField
                                            id="userCompany"
                                            label="Company"
                                            onChange = {this.changeText}
                                            className="inputTextForForm"
                                            margin="normal"
                                            value = {this.state.userCompany}
                                        />
                                </div>

                                {/***********USER school ***************/}
                                <div>
                                    <TextField
                                            id="userSchool"
                                            label="School"
                                            onChange = {this.changeText}
                                            className="inputTextForForm"
                                            margin="normal"
                                            value = {this.state.userSchool}
                                        />
                                </div>

                                {/***********USER hometown ***************/}
                                <div>
                                    <TextField
                                            id="userHometown"
                                            label="Home Town"
                                            onChange = {this.changeText}
                                            className="inputTextForForm"
                                            margin="normal"
                                            value = {this.state.userHometown}
                                        />
                                </div>

                                {/***********USER lang ***************/}
                                <div>
                                    <TextField
                                            id="userLang"
                                            label="Languages Known"
                                            onChange = {this.changeText}
                                            className="inputTextForForm"
                                            margin="normal"
                                            value = {this.state.userLang}
                                        />
                                </div>

                                {/***********USER gender ***************/}
                                <FormControl  >
                                    <InputLabel htmlFor="gender">Gender</InputLabel>
                                    <Select
                                        value={this.state.gender}
                                        onChange={this.handleChange2}
                                        className="inputTextForForm"
                                        inputProps={{
                                        name: 'gender',
                                        id: 'gender',
                                        }}
                                    >
                                        
                                        <MenuItem value='Male' >Male</MenuItem>
                                        <MenuItem value='Female' >Female</MenuItem>
                                        <MenuItem value='Others' >Other</MenuItem>
                                        
                                    </Select>
                                </FormControl>

                                {/***********USER lang ***************/}
                                <div>
                                   <small><i className="oth material-icons">lock</i>This is never shared</small>
                                </div>
                                <br/>
                                <FormControl  >
                                    <InputLabel htmlFor="formatted-text-mask-input">Mobile Number</InputLabel>
                                    <Input
                                        value={textmask}
                                        className="inputTextForForm"
                                        onChange={this.handleChange('textmask')}
                                        id="formatted-text-mask-input"
                                        inputComponent={TextMaskCustom}
                                    />
                                </FormControl>

                                 
                                    
                                 

                                <div className="phoneBox">
                                    <div className="signalBox">
                                    
                                    </div>
                                    <div className="numberBox">
                                    
                                    </div>
                                </div>

                            </div>

                            <div className="viewprof2" onClick={this.updateProfile}>
                                        Save Changes
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="upperStats">
                                <h3 className="section-header">Verifications</h3>
                                <div className="trow">
                                    Email Address <span className="vertext">Verified<i className="material-icons">check</i></span>
                                </div>
                                <div className="drow">
                                    <span className="smallHD">Social Account Verifications</span>
                                    <div className="infoText">Verifying one or more social accounts improves your trustworthiness to owners. We'll never post anything without your permission.</div>
                                </div>
                                <div className="facebook-box">
                                        <button type="button" className="btn btn-lg col-lg-12  fbButton"><i className="fa fa-facebook"></i> Log in with Facebook</button>
                                    </div>
                                    
                                    <div className="google-box">
                                        <button type="button" className="btn btn-lg col-lg-12  gButton"><span className="innerSpan"><img src={require('../../../images/google-color-g.svg')} alt="HomeAway" /></span> Log in with Google</button>
                                    </div>
                            </div>
                            <div className="viewProfile" onClick={this.viewProfile}>
                                <div className="viewprof">
                                    View Profile
                                </div>
                            </div>
                            <div className="viewProfile remM">
                                <div className="largeIcon" >
                                    <i className="material-icons">how_to_reg</i>
                                </div>
                                <div className="listStyle">
                                    <span className="numBoxes">
                                    1
                                    </span>
                                    <span className="textFl">Add a photo of yourself</span>
                                </div>
                                <div className="listStyle">
                                    <span className="numBoxes">
                                    2
                                    </span>
                                    <span className="textFl">Verify your identity</span>
                                </div>
                                <div className="listStyle">
                                    <span className="numBoxes">
                                    3
                                    </span>
                                    <span className="textFl">Describe your interests, hobbies, and why you like to travel</span>
                                </div>
                                <img src={require('../../../images/profile_bottom.png')} className="smallImage" />
                            </div>
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
                <input type="file" id="uploadSelect" className="uploadSelect" name="uploadSelect" onChange={this.manageFile}  multiple accept="image/*" />                           
            </div>
        )
    }
}

export default Profile;
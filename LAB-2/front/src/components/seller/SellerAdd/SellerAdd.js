import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './SellerAdd.css';
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
import Snackbar from '@material-ui/core/Snackbar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { BASE_URL } from '../../common/AppSettings/AppSettings';


const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: '200px',
        borderRadius : '20px',
        padding : '10px',
        fontWeight : 'bold',
        textTransform : 'capitalize',
        letterSpacing : '1px'
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

function getSteps() {
    return ['Welcome', 'Location', 'Property Details', 'Photos','Availability','Pricing'];
}


class SellerAdd extends React.Component {
    state = {
        activeStep: 0,
        placeLocation : '',
        propHeadLine : '',
        propdesc : '',
        propType : '',
        propbedRooms : '',
        propbedaccom : '',
        propbathrooms : '',
        initDate : '',
        finalDate : '',
        currency : '',
        propminstay : '',
        propnightly : '',
        propAmenities : '',
        propArea : '',
        finalSuccess : false,


        open: false,
        vertical: 'bottom',
        horizontal: 'right',
        alertMessage : ''
    };
    
    
    constructor(props)
    {
        super(props);
        
        this.changeText = this.changeText.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    /************ALLOW NUMERIC INPUT ONLY************ */

    restrictNumeric(h)
    {
        if(h == '')
        {
            return true;
        }
        let vlsd = /^[\d]+$/.test(h);
        console.log(vlsd);
        if(vlsd)
        {
            return true;
        }
        else
        {
            return false;
        }
    }


    /****************FUNCTIONS TO HANLDE THE CHANGE OF THE TEXT INPUTS******** */
    changeText(e)
    {
        if(e.target.id=='placeLocation')
        {
            this.setState({
                placeLocation : e.target.value
            });
        }
        else if(e.target.id=='propHeadLine')
        {
            this.setState({
                propHeadLine : e.target.value
            });
        }
        else if(e.target.id=='propdesc')
        {
            this.setState({
                propdesc : e.target.value
            });
        }
        else if(e.target.id=='propType')
        {
            this.setState({
                propType : e.target.value
            });
        }
        else if(e.target.id=='propbedRooms')
        {
            let x = this.restrictNumeric(e.target.value);
            if(x)
            {
                this.setState({
                    propbedRooms : e.target.value
                });
            }
            else
            {
                return false;
            }
        }
        else if(e.target.id=='propbedaccom')
        {
            let x = this.restrictNumeric(e.target.value);
            if(x)
            {
                this.setState({
                    propbedaccom : e.target.value
                });
            }
            else
            {
                return false;
            }
        }
        else if(e.target.id=='propbathrooms')
        {
            let x = this.restrictNumeric(e.target.value);
            if(x)
            {
                this.setState({
                    propbathrooms : e.target.value
                });
            }
            else
            {
                return false;
            } 
        }
        else if(e.target.id=='initDate')
        {
            this.setState({
                initDate : e.target.value
            });
        }
        else if(e.target.id=='finalDate')
        {
            this.setState({
                finalDate : e.target.value
            });
        }
        else if(e.target.id=='propminstay')
        {
            let x = this.restrictNumeric(e.target.value);
            if(x)
            {
                this.setState({
                    propminstay : e.target.value
                });
            }
            else
            {
                return false;
            } 
            
        }
        else if(e.target.id=='propnightly')
        {
            let x = this.restrictNumeric(e.target.value);
            if(x)
            {
                this.setState({
                    propnightly : e.target.value
                });
            }
            else
            {
                return false;
            } 
        }
        else if(e.target.id =='propAmenities')
        {
            this.setState({
                propAmenities : e.target.value
            });
        }
        else if(e.target.id == 'propArea')
        {
            let x = this.restrictNumeric(e.target.value);
            if(x)
            {
                this.setState({
                    propArea : e.target.value
                });
            }
            else
            {
                return false;
            } 
        }
    }

    /*************  FUNCTION TO PRINT THE NEXT OR PREVIOUS STEP AS REQUIRED***** */
    getStepContent  = (step) =>{
        switch (step) {
            case 0:
                /***************WELCOME BOX IN THE FIRST DIV***** */
                return (
                    <div className="container">
                        <div className="welcomeBoxText" >
                            Hey! You are just a few steps away to post your property.
                        </div>
                  </div>
                );
            case 1:
                /****************LOCATIO */
                return (
                        <div className = "locationBox">
                            <div className="upperText">
                                Verify the location of your rental
                            </div>
                            <TextField
                                id="placeLocation"
                                label="Enter Location here"
                                onChange = {this.changeText}
                                className="inputTextForForm"
                                margin="normal"
                                value = {this.state.placeLocation}
                            />
                        </div>
                   
                );
            case 2:
                return (
                    <div className = "locationBox">
                        <div className="upperText">
                            Describe your property<hr/>
                        </div>
                        <div className="smallDesc">
                            Start out with a descriptive headline and a detailed summary of your property.
                        </div>
                        <div  >
                            <TextField
                                    id="propHeadLine"
                                    label="Property Headline"
                                    onChange = {this.changeText}
                                    className="inputTextForForm"
                                    margin="normal"
                                    value = {this.state.propHeadLine}
                                />
                        </div>
                        <div  >
                            <TextField
                                id="propdesc"
                                label="Property Description"
                                multiline
                                rows="4"
                                value = { this.state.propdesc}
                                className="inputTextForForm"
                                margin="normal"
                                variant="filled"
                                onChange = {this.changeText}
                                />
                        </div>
                        {/**********PROPERTY TYPE*************/}
                        <div  >
                            <TextField
                                    id="propType"
                                    label="Property Type"
                                    onChange = {this.changeText}
                                    className="inputTextForForm"
                                    margin="normal"
                                    value = {this.state.propType}
                                />
                        </div>
                        {/**********PROPERTY ROOMS*************/}

                         <div  >
                            <TextField
                                    id="propbedRooms"
                                    label="Number of Bedrooms"
                                    onChange = {this.changeText}
                                    className="inputTextForForm"
                                    margin="normal"
                                    value = {this.state.propbedRooms}
                                />
                        </div>

                        {/**********PROPERTY ROOMS*************/}

                         <div  >
                            <TextField
                                    id="propbedaccom"
                                    label="Accomodates"
                                    onChange = {this.changeText}
                                    className="inputTextForForm"
                                    margin="normal"
                                    value = {this.state.propbedaccom}
                                />
                        </div>

                     {/**********PROPERTY BATHROOMS*************/}

                         <div  >
                            <TextField
                                    id="propbathrooms"
                                    label="Number of Bathrooms"
                                    onChange = {this.changeText}
                                    className="inputTextForForm"
                                    margin="normal"
                                    value = {this.state.propbathrooms}
                                />
                        </div>

                    {/**********PROPERTY AMENITIES*************/}

                         <div  >
                            <TextField
                                    id="propAmenities"
                                    label="Amenities"
                                    onChange = {this.changeText}
                                    className="inputTextForForm"
                                    margin="normal"
                                    value = {this.state.propAmenities}
                                />
                        </div>

                    {/**********PROPERTY AMENITIES*************/}

                         <div  >
                            <TextField
                                    id="propArea"
                                    label="Area (in Sq.ft)"
                                    onChange = {this.changeText}
                                    className="inputTextForForm"
                                    margin="normal"
                                    value = {this.state.propArea}
                                />
                        </div>


                    </div>
               
                );

            case 3:
                return (
                    <div className="container">
                        <div className="imageContainer">
                            <div className="photoHeaderBox" onClick={this.manageFileMain}>
                                SELECT PHOTOS TO UPLOAD
                            </div>
                            <div className="bottomText">
                            Minimum 2 and Maximum of 5 Photos are required. You can choose to upload more than one photo at a time.

                            </div>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="container mainDates">
                    <div className="col-lg-6">
                        <h6>Start Date:</h6>
                        <TextField
                            id="initDate"
                            value = {this.state.initDate}
                            
                            type="date"
                            onChange = {this.changeText}
                            className="initDatePicker inputTextForForm"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div className="col-lg-6">
                         <h6>End Date:</h6>
                        <TextField
                            id="finalDate"
                            value = {this.state.finalDate}
                            
                            type="date"
                            onChange = {this.changeText}
                            className="initDatePicker inputTextForForm"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        </div>

                    </div>
                );
            case 5:
                return (
                    <div className="container">
                        <div className="pricingBox">
                            <div className="upperText">
                            How much do you want to charge?<hr/>
                            <small>We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.</small><hr/>
                            </div>
                            <div className="currencyBox">
                                <FormControl  >
                                    <InputLabel htmlFor="currency">Currency</InputLabel>
                                    <Select
                                        value={this.state.currency}
                                        onChange={this.handleChange}
                                        className="inputTextForForm"
                                        inputProps={{
                                        name: 'currency',
                                        id: 'currency',
                                        }}
                                    >
                                        
                                        <MenuItem value='$' >US Dollar</MenuItem>
                                        <MenuItem value='€' >Euro</MenuItem>
                                        <MenuItem value='CAD' >Canadian Dollar</MenuItem>
                                        <MenuItem value='R$' >Brazilian Real(BRL)</MenuItem>
                                    </Select>
                                    </FormControl>
                            </div>
                                <div  >
                                    <TextField
                                        id="propminstay"
                                        label="Minimum Stay (nights) "
                                        onChange = {this.changeText}
                                        className="inputTextForForm"
                                        margin="normal"
                                        value = {this.state.propminstay}
                                    />
                                </div>
                                <div  >
                                    <TextField
                                        id="propnightly"
                                        label="Nightly Base Rate"
                                        onChange = {this.changeText}
                                        className="inputTextForForm"
                                        margin="normal"
                                        value = {this.state.propnightly}
                                    />
                                </div>
                            

                        </div>
                    </div>
                )

            default:
                return 'Unknown step';
        }
    }


    /****************MOVE TO THE NEXT STEP IN THE MATERIAL STEP */

    handleNext = () => {
        console.log(this.state.activeStep);

        //******VALIDATION FOR STAGE 1******** */
        if(this.state.activeStep == 1)
        {
            let location = this.state.placeLocation;
            if(location == '')
            {
                this.setState({ open: true, alertMessage : 'Please enter a valid location for the property'});
                setTimeout(() => {
                    this.setState({ open: false , alertMessage : ''});
                }, 5000)
                return false;
            }
        }
        else if(this.state.activeStep == 2)
        {
            let {propHeadLine,propdesc,propType,propbedRooms,propbedaccom,propbathrooms,propAmenities,propArea} = this.state;
            if(propHeadLine.trim() == '' || 
            propdesc.trim() == '' || 
            propType.trim() == '' ||
            propbedRooms.trim() == '' ||
            propbedaccom.trim() == '' ||
            propbathrooms.trim() == '' ||
            propAmenities.trim() == '' ||
            propArea.trim() == ''
            )
            {
                this.setState({ open: true, alertMessage : 'Please fill all fields in the form to proceed.'});
                setTimeout(() => {
                    this.setState({ open: false , alertMessage : ''});
                }, 5000)
                return false;
            }
        }
        else if(this.state.activeStep == 3)
        {
            let numberOfFiles = document.getElementById("uploadSelect").files;
            try
            {
                let l = numberOfFiles.length;
                if(!(l >= 2 && l<=5))
                {
                    this.setState({ open: true, alertMessage : 'Please select a minimum of 2 images and maximum of 5 images.'});
                    setTimeout(() => {
                        this.setState({ open: false , alertMessage : ''});
                    }, 5000)
                    return false;
                }
            }
            catch(e)
            {
                console.log(e);
                this.setState({ open: true, alertMessage : 'Please select a minimum of 2 images and maximum of 5 images.'});
                    setTimeout(() => {
                        this.setState({ open: false , alertMessage : ''});
                    }, 5000)
                    return false;
            }
        }
        else if(this.state.activeStep == 4)
        {
            console.log(new Date(this.state.initDate).getTime());
            console.log(new Date(this.state.finalDate).getTime());
            let d1 = new Date(this.state.initDate);
            let d2 = new Date(this.state.finalDate);
            let d3 = new Date().getTime();
            if((d1<d2) && (d1>d3) && (d2>d3))
            {
            }
            else
            {
                this.setState({ open: true, alertMessage : 'Please select a valid date range.'});
                    setTimeout(() => {
                        this.setState({ open: false , alertMessage : ''});
                    }, 5000)
                    return false;
            }
            
        }
        else if(this.state.activeStep==5)
        {
            if(this.state.currency=='' || this.state.propminstay=='' || this.state.propnightly=='')
            {
                this.setState({ open: true, alertMessage : 'Please fill all fields in the form to proceed.'});
                    setTimeout(() => {
                        this.setState({ open: false , alertMessage : ''});
                    }, 5000)
                    return false;
            }


           // alert("Final Submit!");
            let sCopy = this.state;
            var fd = new FormData();
            var filesList = document.getElementById("uploadSelect").files;
            for(var z=0 ; z< filesList.length ; z++)
                fd.append("uploadSelect",filesList[z]);
            sCopy['initDate'] = new Date(sCopy['initDate']).getTime();
            sCopy['finalDate'] = new Date(sCopy['finalDate']).getTime();
            for ( var key in sCopy ) {
                fd.append(key, sCopy[key]);
            }
             let _t = this;
            /*************SUBMITTING FORM TO THE SERVER***************** */
                axios.defaults.withCredentials = true;
                axios({
                    method: 'POST',
                    url: BASE_URL +'/addProperty',
                    data: fd,
                    config: { headers: {'Content-Type': 'multipart/form-data','Authorization':'JWT ' + sessionStorage.getItem('user-token') }},
                    headers: {'Content-Type': 'multipart/form-data' ,Authorization:'JWT ' + sessionStorage.getItem('user-token')}
                    })
                .then(function (response) {
                    if(response.status == 200)
                    {
                        if(response.data == '-1')
                        {
                            alert("There was an error while saving the details. Please try again.");
                            document.location.reload();
                        }
                        else if(response.data == '+1')
                        {
                            window.scrollTo(0, 0);
                            _t.setState({
                                finalSuccess : true
                            })
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

            /*********************************************************** */
            return false;
        }

            this.setState(state => ({
                activeStep: state.activeStep + 1,
                open: false , alertMessage : ''
            }));
    };

    /**********************GO BACK ON THE FUNCTION************ */
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };


    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };


    /*****************FILE UPLOAD CODE************** */

    manageFile(e)
    {
        console.log(e);
        console.log(document.getElementById("uploadSelect").files);
    }

    manageFileMain(e)
    {
        console.log(e);
        document.getElementById("uploadSelect").click();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    clis = () => {
        document.location.reload();
    }
    


    render() {

        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const { vertical, horizontal, open } = this.state;

        return (
            <div className="container containerBox">
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel><h5 className="headerLabel">{label}</h5></StepLabel>
                                    <StepContent>
                                        <div>{this.getStepContent(index,this.state)}</div>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                            <Button
                                                    disabled={activeStep === 0}
                                                    onClick={this.handleBack}
                                                    className={classes.button}
                                                >
                                                   Go Back
                        </Button>&nbsp;
                                            <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Save Details' : 'Continue'}
                                                </Button>
                                                
                                                
                                                
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {/*activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&quot;re finished</Typography>
                            <Button onClick={this.handleReset} className={classes.button}>
                                Reset
              </Button>
                        </Paper>
                    )*/}
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
                {
                    this.state.finalSuccess && (<div className="successMessageBox animate-bottom"   id="myDiv"  >
                    <div> <i className="material-icons">where_to_vote</i>
                         <div className="headerFont" >Congratulations! You are all set to start earning from your property.</div>
                         <div >
                             <Button className="goToButton" variant="contained" color="primary" onClick={this.clis}  >
                                 List Another Property
                             </Button>
                         </div>
                     </div>
                 </div>) 
                
                }  
                

            </div>
        );
    }
}
/* 
VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
};
   */

export default withStyles(styles)(SellerAdd);

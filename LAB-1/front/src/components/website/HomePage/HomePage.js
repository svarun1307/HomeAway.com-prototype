import React, { Component } from 'react';
import axios from 'axios';
import './HomePage.css';
import WebsiteHeader from '../../website/WebsiteHeader/WebsiteHeader';
import cookie from 'react-cookies';

window.globalCTX = 0;
window.chgCT = function(f)
{
    if(f=='-')
        window.globalCTX = window.globalCTX - 1;
    else if(f=='+')
        window.globalCTX = window.globalCTX + 1;
    if(window.globalCTX < 0)
        window.globalCTX = 0;
    
    document.querySelector(".leftToolText").innerHTML = window.globalCTX + " guests";
}

window.dismissPP = function()
{
    //alert(window.globalCTX);
    window.jQuery('.popover').popover('hide');
}

window.goToLoginTraveller = function()
{
    window.location.href="/seller-login";
}

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            whereTo: '',
            fromTo: '',
            fromTo2: ''
        }
        this.changeText = this.changeText.bind(this);
        this.getDataToNextPage = this.getDataToNextPage.bind(this);
        this.travellerLogin = this.travellerLogin.bind(this);
    }

    changeText(e)
    {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    getDataToNextPage()
    {   
        console.log(this.state);
        console.log(window.globalCTX);
        let u = {
            guests : window.globalCTX,
            whereTo : this.state.whereTo,
            fromTo : this.state.fromTo,
            fromTo2 : this.state.fromTo2
        };

        /***************INPUT AND LOGIN VALIDATIONS************** */
        console.log(cookie.load('user'));
        console.log(cookie.load('trcker'));
        if(!cookie.load("user") || !cookie.load("trcker"))
        {

            window.jQuery(".customErrorLoader2").addClass("customErrorLoaderShow2");
            window.setTimeout(()=> window.jQuery(".customErrorLoader2").removeClass("customErrorLoaderShow2"),10000);
            return;
        }
        else if(u['whereTo']=='')
        {
            window.jQuery(".customErrorLoader").html("<strong>Oh snap! </strong> Please select a destination.");
            window.jQuery(".customErrorLoader").addClass("customErrorLoaderShow");
            window.setTimeout(()=> window.jQuery(".customErrorLoader").removeClass("customErrorLoaderShow"),6000);
            return false;
        }
        else if(u['fromTo']=='')
        {
            window.jQuery(".customErrorLoader").html("<strong>Oh snap! </strong> Please select arrival date.");
            window.jQuery(".customErrorLoader").addClass("customErrorLoaderShow");
            window.setTimeout(()=> window.jQuery(".customErrorLoader").removeClass("customErrorLoaderShow"),6000);
            return;
        }
        else if(u['fromTo2']=='')
        {
            window.jQuery(".customErrorLoader").html("<strong>Oh snap! </strong> Please select a depart date.");
            window.jQuery(".customErrorLoader").addClass("customErrorLoaderShow");
            window.setTimeout(()=> window.jQuery(".customErrorLoader").removeClass("customErrorLoaderShow"),6000);
            return false;
        }
        else if(u['guests']==0 || u['guests']=='')
        {
            window.jQuery(".customErrorLoader").html("<strong>Oh snap! </strong> Please select number of guests.");
            window.jQuery(".customErrorLoader").addClass("customErrorLoaderShow");
            window.setTimeout(()=> window.jQuery(".customErrorLoader").removeClass("customErrorLoaderShow"),6000);
            return;
        }
        
        
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/search-data',u)
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
                            alert("No results found for this search query.Please try again");
                        }
                        else if(s.code == '+1')
                        {
                            this.props.history.push({
                                pathname: '/property/search',
                                state: { passedData: response.data , dateData : u }
                            });
                            
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

    componentDidMount() {
        let ot = this;
        window.jQuery('input[id="fromTo"]').daterangepicker({   
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        } , function(start, end, label) {
            ot.setState({
                fromTo : start.format('MM/DD/YYYY'),
                fromTo2 : end.format('MM/DD/YYYY')
            });
             
          });

        window.jQuery("#myPopover").popover({
            title: '',
            content: "<div class='popoverdiv'><span class='leftToolText'>"+window.globalCTX+" guests</span><button class='remButton remButton1' type='button' onclick=chgCT('-')>-</button><button type='button'  onclick=chgCT('+') class='remButton remButton2'>+</button><div class='subBut' onclick='dismissPP()'>Apply</div></div>",
            html: true
        });

        

        window.jQuery('input[id="fromTo"]').on('cancel.daterangepicker', function(ev, picker) {
            ot.setState({
                fromTo : '',
                fromTo2 : ''
            });
        });
    
    }

    travellerLogin()
    {
        this.props.history.push({
            pathname: '/traveller-login',
          });
    }

    gob()
    {
        window.open('/seller-login');
    }


    render() {
        let dataObj = {
            "image" : "white",
            "headerBackground" :  "white",
            "headerColor" : "white",
            "loggedInNeeded" : true,
        }
        return (
            <div className="ccv">
                <WebsiteHeader headerData={dataObj} />
                <div className="jumbotron">
                    <div class="alert alert-danger customErrorLoader">
                        
                    </div>
                    <div class="alert alert-danger customErrorLoader2">
                        <strong>Oh snap!</strong> Please login to proceed. <button type='button' class='btn btn-danger pull-right' type='button' onClick={this.travellerLogin} >Login Now</button>
                    </div>

                    <div className="container mainHeader">
                        <h1 className="jumboHeader">Book beach houses, cabins,<br />condos and more, worldwide</h1>
                        <div className="filtersContainers">
                            <div className="row">
                                <div className="box1 col-lg-4 cc1">
                                    <div className="col-auto">
                                        <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                                        <div className="input-group smallBox">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="material-icons">
                                                    search
</i></div>
                                            </div>
                                            <input type="text" className="form-control" id="whereTo" placeholder="Where do you want to go?" value={this.state.whereTo} onChange={this.changeText} />
                                        </div>
                                    </div>
                                </div>
                                <div className="box2 col-lg-2 cc1">
                                    <div className="col-auto">

                                        <div className="input-group smallBox">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="material-icons">
                                                    calendar_today
</i></div>
                                            </div>
                                            <input type="text" className="form-control" id="fromTo" placeholder="Arrive" value={this.state.fromTo} onChange={this.changeText} />
                                        </div>
                                    </div>
                                </div>
                                <div className="box3 col-lg-2 cc1">
                                    <div className="col-auto">

                                        <div className="input-group smallBox">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="material-icons">
                                                    calendar_today
    </i></div>
                                            </div>
                                            <input type="text" className="form-control" id="fromTo2" placeholder="Depart" value={this.state.fromTo2} onChange={this.changeText} />
                                        </div>
                                    </div>
                                </div>
                                <div className="box4 col-lg-2 cc1">
                                    <div className="col-auto">

                                        <div className="input-group smallBox">

                                            <a className="guestBox" href="javascript:void(0)" id="myPopover" data-toggle="popover" data-placement="bottom"    >
                                            <div className="cenCont">
                                            <i className="material-icons centv">
                                                perm_identity
                                            </i> <span className="gtext">Guests</span></div>
                                            </a>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="box5 col-lg-2 cc1">
                                    <div className="col-auto">
                                        <button type="button" className="customSearchButton"  onClick={this.getDataToNextPage} >Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="container lowerDummyText">
                        <div className="row">
                            <div className="col-lg-4">
                                <strong className="smallBTHeader">Your whole vacation starts here</strong><div className="smallBTFooter">Choose a rental from the world's best selection</div>
                            </div>
                            <div className="col-lg-4">
                                <strong className="smallBTHeader">Book and stay with confidence</strong><div className="smallBTFooter">Secure payments, peace of mind</div>
                            </div>
                            <div className="col-lg-4">
                                <strong className="smallBTHeader">Your vacation your way</strong><div className="smallBTFooter">More space, more privacy, no compromises</div>
                            </div>
                        </div>
                    </div>
                    <div className="justOverlay">
                    
                    </div>
                </div>

            </div>
        );
    }

}

export default HomePage;
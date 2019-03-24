import React, { Component } from 'react';
import axios from 'axios';
import './PropertyDetails.css';
import WebsiteHeader from '../../website/WebsiteHeader/WebsiteHeader';
import cookie from 'react-cookies';
import AskQuestion from '../AskQuestion/AskQuestion';
import { BASE_URL } from '../../common/AppSettings/AppSettings';



window.createScroll = () => {
    var navWrap = window.jQuery('.leftDetailsBox'),
    nav = window.jQuery('.rightDetailsScrollBox'),
    startPosition = navWrap.offset().top;
    var jleft = nav.offset().left;
    var jWidth = nav.outerWidth();
    window.jQuery(document).on('scroll',function () {
        var y = window.jQuery(this).scrollTop()
        //console.log(nav.offset());
        if (y > startPosition) {    
            nav.addClass('sticky');
            nav.css('left',jleft);
            nav.css('width',jWidth);
        } else {
            nav.removeClass('sticky');
            nav.css('left',"0px");
            nav.css('width',"auto");
        } 
    });
}

window.scrollRCT = function(g)
{
    if(g==1)
        {
            /* window.jQuery('html,body').animate({
                scrollTop: window.jQuery("div[data-tomove='scroll1']").offset().top
             }); */
             document.querySelector("div[data-tomove='scroll1']").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

        }
}

window.globalCTX2 = 0;
window.chgCT2 = function(f)
{
    if(f=='-')
        window.globalCTX2 = window.globalCTX2 - 1;
    else if(f=='+')
        window.globalCTX2 = window.globalCTX2 + 1;
    if(window.globalCTX2 < 0)
        window.globalCTX2 = 0;
    
    document.querySelector(".leftToolText").innerHTML = window.globalCTX2 + " guests";
}


window.dismissPP2 = function()
{
    window.jQuery('.popover').popover('hide');
}


window.selectCharity = function(a,b,c,d)
{
    console.log(d);
    window.jQuery(".innerpadder").each(function(){
        window.jQuery(this).removeClass("selected-charity").addClass("not-selected");
    });
    window.jQuery(".innerpadder:eq("+(d)+")").removeClass("not-selected").addClass("selected-charity");
    
}


class PropertyDetails extends React.Component {

    

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            currentImageClass : "currentImage",
            toComeImageClass : "toImageCome",
            loaderShow : "loaderShow",
            currentImagePath : "",
            currentImage : 0,
            totalImages : 0,
            fullPropertyData : {},
            isPropertyAvailable: 'A',
            askAQuestionModal : false,

            fromTo: '',
            fromTo2: '',
            toShowDateError : false,
            loginError : false
        }

        this.currentImage = 0;
        this.totalImages = 0;
        this.ownerPhoto = require('../../../images/img.jpg');
        this.getNextImage = this.getNextImage.bind(this);
        this.proceedToBook = this.proceedToBook.bind(this);
        this.travellerLogin = this.travellerLogin.bind(this);
        this.makeNewBooking = this.makeNewBooking.bind(this);
        this.viewUser =  this.viewUser.bind(this);
        this.askAQuestion = this.askAQuestion.bind(this);
        this.closeQuestionModal = this.closeQuestionModal.bind(this);


        window.globalCTX2 = 0;
    }

    viewUser()
    {
    
        console.log(this.state);
        window.open('/public-profiles/'+this.state.fullPropertyData.ownerDetails[0].userid,'_blank');
    }

    componentDidMount()
    {
        let y = this;
        let givenIDx = this.props.match.params.id;
        if(givenIDx != '')
        {
            let givenID = { "givenID" : givenIDx} ;
            console.log(givenID);
            //axios.defaults.withCredentials = true;
            //axios.get(BASE_URL +'/getFullPropertyDetails/'+givenIDx)
            let authstring =  'JWT ' + sessionStorage.getItem('user-token');
            axios({
                method: 'GET',
                url: BASE_URL+'/getFullPropertyDetails/'+givenIDx,
                headers: { 'Authorization': authstring}
            })
                .then(response => {
                    console.log("Status Code : ",response.status);
                    console.log(response);
                    if(response.status === 200){
                        try
                        {
                            let s = response.data;//JSON.parse(response.data);

                            if(s.code == '-1')
                            {
                                alert("No results found for this search query.Please try again");
                                y.setState({
                                    loaderShow : "loaderShow doNotShow"
                                });
                            }
                            else if(s.code == '+1')
                            {
                                
                                let yx = response.data.error_type[0]["firstImageData"];//'data:image/jpg;base64, ' +response.data.error_type[0]["firstImageData"];
                            
                                let {firstImageData, ...restObj} = response.data.error_type[0];
                                y.setState({
                                    currentImagePath : yx,
                                    loaderShow : "loaderShow doNotShow",
                                    fullPropertyData : restObj
                                });
                                this.totalImages = response.data.error_type[0]["totalImages"];
                                
                                if(!response.data.error_type[0].ownerDetails[0].ownerPhoto)
                                {
                                    this.ownerPhoto =  require('../../../images/img.jpg') ;
                                }
                                else 
                                {
                                    this.ownerPhoto = response.data.error_type[0].ownerDetails[0].ownerPhoto;//'data:image/jpg;base64, ' + response.data.error_type[0].ownerDetails[0].ownerPhoto
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


        try
        {
            let startURLDate = new Date(parseInt(this.props.match.params.d1));
            let endURLDate = new Date(parseInt(this.props.match.params.d2));
            
            let startURLDatePart1 = ((startURLDate.getMonth()+1).toString().length==1)?('0'+(startURLDate.getMonth()+1)):(startURLDate.getMonth()+1);
            let startURLDatePart2 = (startURLDate.getDate().toString().length==1)?('0'+startURLDate.getDate()):startURLDate.getDate()

            let endURLDatePart1 = ((endURLDate.getMonth()+1).toString().length==1)?('0'+(endURLDate.getMonth()+1)):(endURLDate.getMonth()+1);             
            let endURLDatePart2 = (endURLDate.getDate().toString().length==1)?('0'+endURLDate.getDate()):endURLDate.getDate()
            
            
            let finalZ1 = startURLDatePart1 + "/" + startURLDatePart2 + '/' + startURLDate.getFullYear();
            let finalZ2 = endURLDatePart1 + "/" + endURLDatePart2 + '/' + endURLDate.getFullYear();

            this.setState({
                fromTo : finalZ1,
                fromTo2 : finalZ2
            });

            console.log(finalZ1);
            console.log(finalZ2);
            window.jQuery('input[id="fromTo"]').data('daterangepicker').setStartDate(finalZ1+'');
            window.jQuery('input[id="fromTo"]').data('daterangepicker').setEndDate(finalZ2+'');

            window.globalCTX2 =  (this.props.match.params.d3) ? this.props.match.params.d3 : 2; 

        }
        catch(e)
        {

        }


        window.createScroll();
        window.jQuery("#myPopover2").popover({
            title: '',
            content: "<div class='popoverdiv'><span class='leftToolText'>"+window.globalCTX2+" guests</span><button class='remButton remButton1' type='button' onclick=chgCT2('-')>-</button><button type='button'  onclick=chgCT2('+') class='remButton remButton2'>+</button><div class='subBut' onclick='dismissPP2()'>Apply</div></div>",
            html: true
        });

        window.jQuery('#myPopover2').on('show.bs.popover', function () {
               window.globalCTX2 = 0;
        });




    }

    makeNewBooking()
    {
        this.props.history.push({
            pathname: '/',
          });
    }


    travellerLogin()
    {
        this.setState({
            loginError : false,
            toShowDateError : false
        })
        this.props.history.push({
            pathname: '/traveller-login',
          });
    }

    getNextImage(e){

        e.stopPropagation();

        let totalImages = this.totalImages;
        //console.log(e.target);
        let opt = e.target.getAttribute('data-type');
        //console.log(totalImages + "--" + opt + "--" + this.currentImage);
        this.setState({
            loaderShow : "loaderShow"
        });
        

        let y = this;
       //console.log(this.state);

        if(opt == "-")
                                {
                                    if(this.currentImage == 0)
                                    {
                                        this.currentImage = this.totalImages -1;
                                        /* y.setState(prevState => ({
                                            currentImage : prevState.totalImages-1
                                        })); */
                                    }
                                    else 
                                    {
                                        this.currentImage = this.currentImage - 1;
                                        /* y.setState(prevState => ({
                                            currentImage : prevState.currentImage - 1
                                        })); */
                                    }
                                }
        else if(opt == "+")
        {
            if(this.currentImage == (this.totalImages-1))
            {
                //console.log("+1a");
                this.currentImage = 0;
                /* y.setState(prevState => ({
                    loaderShow : "loaderShow doNotShow",
                    currentImage : 0
                })); */
            }
            else 
            {
                this.currentImage = this.currentImage + 1;
                /* y.setState(prevState => ({
                    currentImage : prevState.currentImage + 1
                })); */
            }
        }

        
        
        
        setTimeout(()=>{
            //console.log(this.currentImage + "--CURRIMAGE");
            let givenIDx = this.props.match.params.id;
            let given = {"currentID" : givenIDx , "currentImage":this.currentImage};

        //axios.defaults.withCredentials = true;
            /* axios.post(BASE_URL+'/getSinglePropertyImage', given , 
                { 
                    headers: {Authorization:'JWT ' + sessionStorage.getItem('user-token')}
                }) */
                let authstring = 'JWT ' + sessionStorage.getItem('user-token');
                axios({
                    method: 'POST',
                    data : given,
                    url: BASE_URL+'/getSinglePropertyImage',
                    headers: { 'Authorization': authstring}
                })
                .then(response => {
                    //console.log("Status Code : ",response.status);
                   // console.log(response);
                    if(response.status === 200){
                        try
                        {
                            let s = response.data;//JSON.parse(response.data);
                            if(s.code == '-1')
                            {
                                alert("No results found for this search query.Please try again");
                            }
                            else if(s.code == '+1')
                            {
                                //alert("Success");
                                let yx = response.data.error_type[0]["firstImageData"];//'data:image/jpg;base64, ' +response.data.error_type[0]["firstImageData"];
                                //console.log(yx);
                                //console.log("checl",this.state);
                                y.setState(prevState => ({
                                    currentImagePath : yx,
                                    loaderShow : "loaderShow doNotShow",
                                     
                                }));
                                
                                //console.log(y.state);
                            }
    
                        }
                        catch(e)
                        {
                            //console.log(e);
                        }
                    }else{
                         
                    }
                });
        },200);
        
    }


    //************************ASK A QUESTION******************* */

    askAQuestion(e)
    {
        e.preventDefault();
        this.setState({
            askAQuestionModal : true
        });
    }

    /********************************************************** */

    manageTopNav(ind)
    {
             document.querySelector("div[data-tomove='scroll"+ind+"']").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    proceedToBook()
    {
        console.log(this.state);
        let rthis =  this;
        if(sessionStorage.getItem('user') && sessionStorage.getItem('trcker'))
        {
            try
            {
                




                //axios.defaults.withCredentials = true;
                let authstring = 'JWT '+sessionStorage.getItem('user-token');
                axios({
                    method: 'POST',
                    data : {},
                    url: 'http://ec2-18-144-45-95.us-west-1.compute.amazonaws.com:8081/api/search',
                    //headers: { 'Authorization': authstring}
                })
                .then(response => {
                    console.log("Status Code : ",response.status);
                    console.log(response);

                    try 
                    {
                        let data = response['data']['payLoad'];
                        let tempstr = '';
                        for(let i = 0 ; i < 6; i++)
                        {
                            tempstr = tempstr + '<div class="col-lg-6 charity-box" data-id="'+data[i]['charity_id']+'" data-url="'+data[i]['charity_url']+'" onClick=selectCharity("'+data[i]['charity_id']+'","'+data[i]['charity_url']+'","'+encodeURIComponent(data[i]['charity_name'])+'","'+i+'") ><div class="innerpadder"> <img class="charity-image keepbg" src="'+data[i]['charity_logo']+'" /><div class="charity-details"><div class="charity-name">'+data[i]['charity_name']+'</div><div class="charity-desc"></div></div> </div></div>';
                        }
                        //tempstr = '<div className="row">' + tempstr + '</div>';
                        window.jQuery(".paste-charity div").html(tempstr);
                    }
                    catch(e)
                    {
                        console.log(e);
                    }





                    setTimeout(()=> {
                        window.jQuery('.fullPageLoaderSuccessMessage').addClass('fullPageLoaderSuccessMessageOpen');
                    },200);
                    
                });

            }
            catch(e)
            {
                alert("Please try again. An unexpected error occurred");
            }
            
        }
        else 
        {
            rthis.setState({
                loginError : true
            });

            setTimeout(()=>{
                rthis.setState({
                    loginError : false
                })
            },8000);
            //alert("Please login and try again.");
        }
    }

    closeQuestionModal()
    {
        this.setState({
            askAQuestionModal : false
        })
    }



    closePayment()
    {
        window.jQuery('.fullPageLoaderSuccessMessage').removeClass('fullPageLoaderSuccessMessageOpen');
    }


    render() {

        if(!this.ownerPhoto)
        {
            this.ownerPhoto =  require('../../../images/img.jpg') ;
        }

        console.log(this.ownerPhoto);
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let dataObj = {
            "image" : "blue",
            "headerBackground" :  "white",
            "headerColor" : "black",
            "loggedInNeeded" : true,
        }
        console.log(this.state);
        var temparr = [];
        var tempjoinedon= '';
        var langspoken = '';
        var email  = '';
        try
        {
            if(this.state.fullPropertyData.ex1 != '')
                var temparr = this.state.fullPropertyData.ex1.split(',');
            console.log(temparr);
            console.log(this.state.fullPropertyData.ownerDetails[0]);
            let k =this.state.fullPropertyData.ownerDetails[0].joinedon;
            k = parseInt(k);
            tempjoinedon = '' + months[new Date(k).getMonth()] + ' ' + new Date(k).getFullYear() ;

            email = this.state.fullPropertyData.ownerDetails[0].email ? (<a href={'mailto:' + this.state.fullPropertyData.ownerDetails[0].email} >{this.state.fullPropertyData.ownerDetails[0].email}</a>) :  '-';



        }
        catch(w)
        {
            console.log(w);
        }
        

        return (
            <div className="ccv">
                <WebsiteHeader headerData={dataObj} />
                <div className="fullWidthLeftBox">
                    

                    <div className="col-lg-11 row leftDetailsBox">
                        
                        <div className="leftDetailsBoxInner col-lg-9">

                            <div  >
                                                    
                                                    <ul className="nav nav-tabs headerNavs">
                                                        <li className="active"><a onClick={() => this.manageTopNav(1) }>Details</a></li>
                                                        <li><a onClick={() => this.manageTopNav(2) }>About</a></li>
                                                        <li  onClick={() => this.manageTopNav(3) }><a>Manager</a></li>
                                                        <li><a onClick={() => this.manageTopNav(4) }>Amenities</a></li>
                                                        <li><a onClick={() => this.manageTopNav(5) }>Photos</a></li>
                                                    </ul>
 
                                            </div>


                            <div className="sliderBox"  data-tomove="scroll5" > 

                                <div className={this.state.currentImageClass} >
                                    <img src={this.state.currentImagePath} className="sliderDisplayImage" alt="HomeAway" />
                                </div>
                                <div className=
                                {this.state.loaderShow}>
                                    <img src={require("../../../images/7plX.gif")} />
                                </div>
                                <div className="rightArrow arrowsHover" onClick={this.getNextImage} data-type="+" ><i  data-type="+"  className="material-icons">
                                keyboard_arrow_right
                                </i></div>
                                <div className="leftArrow arrowsHover" onClick={this.getNextImage} data-type="-" ><i  data-type="-"  className="material-icons">
                                keyboard_arrow_left
                                </i></div>
                            </div>

                            <div className="col-lg-12">
                                <div className="propertyHeader" data-tomove="scroll1" >
                                    <h1>{this.state.fullPropertyData.headline}<div className="propLocation"> <i className="fas fa-map-marker-alt innerDetailsIcons smallerSizeForceIcons">
                                                 
                                                 </i>{this.state.fullPropertyData.location}</div></h1>
                                    <hr/>
                                    <h6 className="propertyDetails">Details</h6>
                                    {/**********PROPERTY ICONS**********/}
                                    <div className="row col-lg-12 topPadder">
                                        <div className="propertyDetailsBox col-lg-1">
                                        </div>
                                        <div className="propertyDetailsBox col-lg-2">
                                            <div className="innerDetails">
                                            
                                                <i className="fas fa-home innerDetailsIcons"></i>
                                                <div className="smallIconDescription">Area</div>
                                                <div className="propertyDetailsText">
                                                    {this.state.fullPropertyData.ex2} sq.ft
                                                </div>
                                            </div>
                                        </div>
                                        <div className="propertyDetailsBox col-lg-2">
                                            <div className="innerDetails">
                                                
                                                <i className="fas fa-user-friends innerDetailsIcons">
                                                 
                                                </i>
                                                <div className="smallIconDescription">Sleeps</div>
                                                <div className="propertyDetailsText">
                                                    {this.state.fullPropertyData.accomodates} 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="propertyDetailsBox col-lg-2">
                                             <div className="innerDetails">
                                                <i className="fas fa-bed innerDetailsIcons">
                                                 
                                                </i>
                                                <div className="smallIconDescription">Bedrooms</div>
                                                <div className="propertyDetailsText">
                                                    {this.state.fullPropertyData.bedrooms} 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="propertyDetailsBox col-lg-2">
                                            <div className="innerDetails">
                                                <i className="fas fa-bath innerDetailsIcons">
                                                 
                                                </i>
                                                <div className="smallIconDescription">Bathrooms</div>
                                                <div className="propertyDetailsText">
                                                    {this.state.fullPropertyData.bathrooms} 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="propertyDetailsBox col-lg-2">
                                            <div className="innerDetails">
                                                <i className="fas fa-moon innerDetailsIcons">
                                                 
                                                </i>
                                                <div className="smallIconDescription">Minimum Stay</div>
                                                <div className="propertyDetailsText">
                                                    {this.state.fullPropertyData.nights} 
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <hr/>

                                    {/**********PROPERTY DISCALIMER**********/}
                                    <div className="col-lg-12">
                                        <span className="disclaimerText">
                                            Note: Photos shown are representative and may not be the actual unit available
                                        </span>

                                    </div>

                                    {/**********PROPERTY  TYPE**********/}
                                     <div className="col-lg-12 uppermargin">
                                        <div className="descHeader">
                                           Property Type
                                        </div>
                                        <div className="descDetails">
                                            {this.state.fullPropertyData.type}
                                        </div>
                                    </div>
                                    <hr/>


                                    {/**********ABOUT THE PROPERTY**********/}
                                     <div className="row col-lg-12 uppermargin"  data-tomove="scroll2" >
                                        <div className="descHeader col-lg-2">
                                            About the property
                                        </div>
                                        <div className="descDetails col-lg-10">                                            {this.state.fullPropertyData.propdesc}
                                        </div>
                                    </div>

                                    <hr/>
                                    {/**********ABOUT THE OWNER**********/}
                                    <div className="row col-lg-12 uppermargin"  data-tomove="scroll3" >
                                        <div className="descHeader col-lg-12">
                                           <br/> Owner Details

                                           <div className="col-lg-4 float-right askqn" onClick={this.askAQuestion}>
                                            Ask a Question
                                           </div>
                                        </div>
                                        <div className="descDetails col-lg-3" onClick={this.viewUser}>        
                                        <img src={this.ownerPhoto} alt="HomeAway" />                              
                                        </div>
                                        <div className="descDetails bigLeft col-lg-7" onClick={this.viewUser}>          <div className="initOwner">
                                                 Owner/Manager
                                               </div>
                                               <div className="memberSince">
                                                    Member Since : {
                                                        tempjoinedon
                                                       
                                                    }
                                               </div>  
                                            <br/>
                                            <div className="memberSince">
                                                    <span className="smallerUserDetails1">Email:</span> <span className="smallerUserDetails2">{        
                                                        email
                                                             }  
                                                    </span>
                                               </div>
                                               <div className="memberSince">
                                                    <span className="smallerUserDetails1">Speaks:</span> <span className="smallerUserDetails2">{        
                                                        langspoken
                                                             }  
                                                    </span>
                                               </div>

                                                <div className="memberSince">
                                                    <span className="smallerUserDetails1">Response Time:</span> <span className="smallerUserDetails2">Within 2 days
                                                    </span>
                                               </div> 

                                               <div className="memberSince">
                                                    <span className="smallerUserDetails1">Response Rate:</span> <span className="smallerUserDetails2">100%
                                                    </span>
                                               </div>               



                                        </div>
                                        <div className="descDetails col-lg-2">                                            
                                        </div>
                                    
                                    
                                    </div>


                                    <hr/>
                                     {/**********ABOUT THE PROPERTY**********/}
                                     <div className="row col-lg-12 uppermargin"  data-tomove="scroll4" >
                                        <div className="descHeader col-lg-12">
                                           <br/> Additional Details
                                        </div>
                                        <div className="table-responsive descDetails col-lg-12">                                            
                                            <table className="table table-striped">
                                            
                                                <tbody>
                                                    <tr>
                                                        <th>
                                                     Location
                                                        </th>
                                                        <th>
                                                         {this.state.fullPropertyData.location}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                        Property Type
                                                        </th>
                                                        <th>
                                                         {this.state.fullPropertyData.type}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                        Area
                                                        </th>
                                                        <th>
                                                         {this.state.fullPropertyData.ex2} sq.ft
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                        Bedrooms
                                                        </th>
                                                        <th>
                                                         {this.state.fullPropertyData.bedrooms} Bedroom(s)
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                        Accomodates
                                                        </th>
                                                        <th>
                                                         {this.state.fullPropertyData.accomodates} people
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                        Bathrooms
                                                        </th>
                                                        <th>
                                                         {this.state.fullPropertyData.bathrooms} Bathroom(s)
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                        Minimum Stay
                                                        </th>
                                                        <th>
                                                         {this.state.fullPropertyData.nights} nights(s)
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                        Photos Available
                                                        </th>
                                                        <th>
                                                         {this.state.fullPropertyData.totalImages}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                        Amenities
                                                        </th>
                                                        <th>
                                                        {
                                                             
                                                             temparr.map((t,v)=>{
                                                             return (<div key={v} className="indAmn">{t}<br/></div>);
                                                         })}
                                                        
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                        General
                                                        </th>
                                                        <th>
                                                        <div className="indAmn">
Heating<br/></div>
                                                        <div className="indAmn">Internet<br/></div>
                                                        <div className="indAmn">Linens Provided<br/></div>
                                                        <div className="indAmn">Living Room<br/></div>
                                                        <div className="indAmn">Telephone<br/></div>
                                                        <div className="indAmn">Towels Provided<br/></div>
                                                        <div className="indAmn">Washing Machine<br/></div>
                                                        
                                                        </th>
                                                    </tr>

                                                </tbody>
                                            
                                            </table>


                                        </div>
                                    </div>

                                    


                                </div>


                            </div>

                        </div>


                        <div className="col-lg-3 topPadder">
                            <div className="rightFloatuppertext col-lg-12">
                                <strong>Book Online</strong> or call HomeAway Booking Assistance <strong>888-829-7076</strong>
                            </div>
                            <div className="rightDetailsScrollBox col-lg-12">
                                <span className="currencyValueDisplay">{this.state.fullPropertyData.currency}   {this.state.fullPropertyData.baseRate}
                                </span> 
                                <div className="textValue">
                                    avg/night
                                </div>

                                <div className="row smallDates">
                                    <div className="isAvailableDates col-lg-12">
                                        Your dates are
                                        {
                                            this.state.isPropertyAvailable == 'A' ? (<span className="propAvail"> Available </span>) : <span className="propNotAvail"> Not Available </span>
                                        }
                                    </div>

                                    <div className="startDateAgain col-lg-6">
                                        <input type="text" className="form-control" id="fromTo" placeholder="Arrive" value={this.state.fromTo} onChange={this.changeText} />
                                    </div>
                                    <div className="endDateAgain col-lg-6">
                                        <input type="text" className="form-control" id="fromTo2" placeholder="Depart" value={this.state.fromTo2} onChange={this.changeText} />
                                    </div>
                                    <div className="box4 col-lg-12 cc2">
                                        
                                            <div className="input-group justGuests">

                                                <a className="guestBox" href="javascript:void(0)" id="myPopover2" data-toggle="popover" data-placement="bottom"    >
                                                <div className="cenCont">
                                                <i className="material-icons centv">
                                                    perm_identity
                                                </i> <span className="gtext">Guests</span></div>
                                                </a>
                                                
                                            </div>
                                         
                                    </div>


                                </div>

                                <div className="row smallGuestBox">
                                    <div className="newGuestInput">
                                    
                                    </div>
                                </div>

                                <div className="row instantConfirm">
                                    <div className="instantConfirmText col-lg-12">
                                        <i className="fas fa-bolt smallLightning"></i>  Instant Confirmation
                                    </div>
                                </div>

 
                                <div className="row instantConfirm">
                                    <div className="instantConfirmText col-lg-12">
                                    <button className="btn btn-book bookingButton "  onClick={this.proceedToBook} >
                                        <span>Book Now</span>
                                    </button>
                                    </div>
                                </div>
                                    
                                <div className="row instantConfirm">
                                    <div className="instantConfirmText col-lg-12">
                                    
                                        <a className="askManagerdummy">Ask Manager a Question</a>
                                    
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>
                {
                    this.state.toShowDateError && (<div class="alert alert-danger fullDateError" role="alert">
                    <strong>Oh snap!</strong> The property is already booked in these dates.Please try again.
                  </div>)

                }
                {
                    this.state.loginError && (<div class="alert alert-danger customErrorLoader3">
                        <strong>Oh snap!</strong> Please login to proceed. <button type='button' class='btn btn-danger pull-right' type='button' onClick={this.travellerLogin} >Login Now</button>
                    </div>)
                }

                <div className="fullPageLoaderSuccessMessage ">  
                {/*<div className="fullPageLoaderSuccessMessageContents">
                        <i class="fab fa-fort-awesome"></i>
                        <div className="successText">
                            Congratulations ! Your booking was completed successfully. <br/>
                            <small>Please check your dashboard for more details.</small>
                        </div>
                        <button type="button" class="btn bookAgainButton" onClick={this.makeNewBooking} >
                            Make a New Booking
                        </button>
                    </div>
                    

                    **** CHARITY INTEGRATION****/}

                    <div class="checkout-panel">
  <div class="panel-body">
    <h2 class="title">Checkout</h2>
 
    <div class="progress-bar">
      <div class="step active"></div>
      <div class="step active"></div>
      <div class="step"></div>
      <div class="step"></div>
    </div>
 
    <div className="container">
        <div className="row">
            <div className="col-lg-7">
                                <div class="payment-method">
                        <label for="card" class="method card">
                            <div class="card-logos">
                            
                      

                            <img src="https://i.ibb.co/KNKwC9C/mastercard-logo.png"/>
                            <img src="https://i.ibb.co/6vmHzHN/visa-logo.png"/>
                            </div>
                    
                            <div class="radio-input">
                            <input id="card" type="radio" name="payment"/>
                                <span className="paytext"> Pay with credit card </span>
                            </div>
                        </label>
                        </div>


                        <div className="col-lg-12">
                        
    <div class="input-fields">
      <div class="column-1">
        <label for="cardholder">Cardholder's Name</label>
        <input type="text" id="cardholder" />
 
        <div class="small-inputs">
          <div>
            <label for="date">Valid thru</label>
            <input type="text" id="date" placeholder="MM / YY" />
          </div>
 
          <div>
            <label for="verification">CVV / CVC *</label>
            <input type="password" id="verification"/>
          </div>
        </div>
 
      </div>
      <div class="column-2"><br/>
        <label for="cardnumber">Card Number</label>
        <input type="password" id="cardnumber"/>
 
        <span class="info">* CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.</span>
      </div>
    </div>
                        </div>
            </div>


            <div className="col-lg-5 paste-charity">
                    <div className="row">
                         
                    </div>
            </div>


        </div>
    </div>

 
  </div>

  <div class="panel-footer">
    <button class="btn back-btn" type="button" onClick={this.closePayment} >Back</button>
    <button class="btn next-btn">Next Step</button>
  </div>
   
 
</div>

                    {/**** CHARITY INTEGRATION ***/}
                </div>

                {/**********MODAL COMPONENT**************/}

                {
                    this.state.askAQuestionModal && (
                        <div className="modalBoxForQn">
                              <AskQuestion propertyIDV = {this.props.match.params.id} closeModal={this.closeQuestionModal} ></AskQuestion>

                        </div>
                    )
                }

                  <div class="alert alert-success customErrorLoader">
                        
                        </div>




            </div>
            );
        
    }
}

export default PropertyDetails;
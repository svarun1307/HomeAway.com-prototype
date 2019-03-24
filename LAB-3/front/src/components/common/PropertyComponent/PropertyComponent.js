import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import {Link} from 'react-router-dom';
import './PropertyComponent.css';
import cookie from 'react-cookies';
import { BASE_URL } from '../AppSettings/AppSettings';

window.initializeSliders = function(){
    window.jQuery('.lightSlider').slippry({adaptiveHeight : false,auto: false});
}

class PropertyComponents extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.clickedOnProperty = this.clickedOnProperty.bind(this);
        this.showUserDetails = this.showUserDetails.bind(this);
    }

    showUserDetails(f)
    {
        //alert("yes");
        window.open('/public-profiles/'+f,'_blank');

    }

    componentDidMount()
    {
        window.initializeSliders();
    }

    clickedOnProperty()
    {
        console.log(this.props);
        let ids = this.props.propertyInfo.uniqueid;
        let currentTime = new Date().getTime();
        let dateData = {fromTo: currentTime,fromTo2: (currentTime + ( (7 * 24 * 60 * 60 * 1000))) };
        try
        {   
            if(this.props.dateData.passedDates.fromTo && this.props.dateData.passedDates.fromTo2)
            {
                dateData['fromTo'] = this.props.dateData.passedDates.fromTo;
                dateData['fromTo2'] = this.props.dateData.passedDates.fromTo2;
                console.log("yes dates");
                console.log(dateData);
            } 
            else
            {
                console.log("no dates");
                console.log(dateData);
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

    render(){
        let extraData1 = false;
        let extraData2 = false;
        console.log(this.props.isArrayBooked);
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

        return (
                <div className="row">
                    <div className="col-lg-1"></div>
                        <div className="col-lg-10 propertyBox row"  >      
                            <div className="col-lg-4 leftImageHalf" onClick={this.clickedOnProperty}>
                                    <ul className="lightSlider">
                                    {/* {
                                        this.props.propertyInfo.CIM.map(function(d,i){
                                            let s = d;//'data:image/jpg;base64, ' + d;
                                            return (
                                                <li key={i} data-thumb={i} ><img className="propertyImages" src={s} /></li>
                                            )
                                        })
                                    } */ }
                                    </ul>
                            </div>
                            <div className="col-lg-8 rightInfoHalf" onClick={this.clickedOnProperty}>
                                <div className="propertyHeaderInfo">
                                    <h4 className="boxHeader" >{this.props.propertyInfo.headline}</h4>
                                </div>
                                <div className="propertyHeaderBrief">
                                    <ul className="amenitiesUL">
                                        <li className="propertyBriefs afterBox" ><a >{this.props.propertyInfo.type}</a></li>
                                        <li className="propertyBriefs afterBox" ><a>{this.props.propertyInfo.bedrooms}BR</a></li>
                                        <li className="propertyBriefs afterBox" ><a>{this.props.propertyInfo.bathrooms}BA</a></li>
                                        <li className="propertyBriefs afterBox" ><a>Sleeps {this.props.propertyInfo.accomodates}</a></li>
                                        <li className="propertyBriefs afterBox" ><a>{this.props.propertyInfo.ex2} sq.ft</a></li>
                                    </ul>
                                </div>
                                <div className="bottomPrices">
                                    <span className="currencyBox">{this.props.propertyInfo.currency}</span>&nbsp;
                                    <span className="currencyBox2">{this.props.propertyInfo.baseRate}</span> avg/night
                                </div>

                            </div>
                            {
                                  extraData1 && (<h5 className="bookhistory" >Booking History</h5> )     
                            }

  {/*                          
{
    
    this.props.propertyInfo.bookings.map((p,j)=>{

        return ( extraData1 && (
            
            <div className="col-lg-12 extraDet">
                
                <div className="col-lg-1"></div>
                <div className="row bookPageDetails"  onClick={()=>this.showUserDetails(p.userid)}>
                    <div className="col-lg-4 bookPageDetailsLeft">
                        Booked By : 
                    </div>
                    <div className="col-lg-8 bookPageDetailsRight">
                         <b>(Click to View details)</b>
                    </div>
    
                     <div className="col-lg-4 bookPageDetailsLeft">
                        Booked On : 
                    </div>
                    <div className="col-lg-8 bookPageDetailsRight"  >
                        {new Date(parseInt(p.startBook)).getMonth() + '/' +new Date(parseInt(p.startBook)).getDate() + '/' + new Date(parseInt(p.startBook)).getFullYear() + ' '} to 
                        { ' '+ new Date(parseInt(p.endBook)).getMonth() + '/' +new Date(parseInt(p.endBook)).getDate() + '/' + new Date(parseInt(p.endBook)).getFullYear() } 
                     </div>
    
    
                     <div className="col-lg-4 bookPageDetailsLeft">
                        Booking Made On : 
                    </div>
                    <div className="col-lg-8 bookPageDetailsRight"  >
                        {new Date(parseInt(p.bookedOn)).getMonth() + '/' +new Date(parseInt(p.bookedOn)).getDate() + '/' + new Date(parseInt(p.bookedOn)).getFullYear() } 
                    </div>
                    
                </div>
            </div>
    
        ))


    })
}



{
    
    this.props.propertyInfo.bookings.map((q,k)=>{
        let c  = sessionStorage.getItem('trcker');
        if( c == q.userid)
        {
            return (     extraData2 && (
                <div className="col-lg-12 extraDet">
                    <div className="col-lg-1"></div>
                    <div className="row bookPageDetails"  onClick={()=>this.showUserDetails(q.userid)}>
                        <div className="col-lg-4 bookPageDetailsLeft">
                            Property Owned By : 
                        </div>
                        <div className="col-lg-8 bookPageDetailsRight">
                            <b>Click to View details</b>
                        </div>
        
                         <div className="col-lg-4 bookPageDetailsLeft">
                            Booked On : 
                        </div>
                        <div className="col-lg-8 bookPageDetailsRight"  >
                            {new Date(parseInt(q.startBook)).getMonth() + '/' +new Date(parseInt(q.startBook)).getDate() + '/' + new Date(parseInt(q.startBook)).getFullYear() + ' '} to 
                            { ' '+ new Date(parseInt(q.endBook)).getMonth() + '/' +new Date(parseInt(q.endBook)).getDate() + '/' + new Date(parseInt(q.endBook)).getFullYear() } 
                         </div>
        
        
                         <div className="col-lg-4 bookPageDetailsLeft">
                            Booking Made On : 
                        </div>
                        <div className="col-lg-8 bookPageDetailsRight"  >
                            {new Date(parseInt(q.bookedOn)).getMonth() + '/' +new Date(parseInt(q.bookedOn)).getDate() + '/' + new Date(parseInt(q.bookedOn)).getFullYear() } 
                        </div>
                        
                    </div>
                </div>
        
            ))
        }
        


    })
}

*/}

                        </div>
                        

                </div>
            
        )
    }

}

export default PropertyComponents
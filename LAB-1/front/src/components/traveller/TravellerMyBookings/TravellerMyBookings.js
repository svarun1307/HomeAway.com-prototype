import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import cookie from 'react-cookies';
import PropertyComponents from '../../common/PropertyComponent/PropertyComponent';
import './TravellerMyBookings.css';
import { BASE_URL } from '../../common/AppSettings/AppSettings';

class TravellerMyBookings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placesArraySeller : [],
        }
    }

    componentDidMount()
    {
        
        let _s = this;
        let u = { userkey : cookie.load('trcker')};
        console.log(u);
        //alert("asd");
        axios.defaults.withCredentials = true;
        axios.get(BASE_URL+'/traveller-bookings',u)
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
                            //this.placesArray = this.props.location.state.passedData.error_type;
                            _s.setState({
                                placesArraySeller : response.data.error_type
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


    render() {

        console.log(this.state);
        return(
           
            
            <div>

                <div className="container">
                    <div className="col-lg-12"><div className="col-lg-12">
                        <h2 className="mybookingsheader">My Bookings<hr/></h2>
                        {
                            this.state.placesArraySeller.map(function(player,i) {  
                                console.log(player,"PLATER");
                                return <PropertyComponents key={i} propertyInfo={player}  />
                            })
                        }
                    </div>
                </div>
                </div>
            </div>
            
            
        )
    }
}
 

export default TravellerMyBookings;

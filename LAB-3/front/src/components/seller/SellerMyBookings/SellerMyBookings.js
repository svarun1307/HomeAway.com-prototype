import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import SellerDashBoardHeader from '../../common/SellerDashBoardHeader/SellerDashBoardHeader';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './SellerMyBookings.css';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import PropertyComponents from '../../common/PropertyComponent/PropertyComponent';
import { BASE_URL } from '../../common/AppSettings/AppSettings';
import { setMyBookings } from '../../../actions/index';
import { connect } from 'react-redux';
import DashBoardFilter from '../../common/DashBoardFilter/DashBoardFilter';

class SellerMyBookings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placesArraySeller : [],
            placesArraySellerCopy : [],
            filterText: '',
            fromTo2FLDF : '',
            fromToFLDF : '',
        }

        this.changeFilter =  this.changeFilter.bind(this);
        this.passFilters =  this.passFilters.bind(this);
    }

    componentDidMount()
    {

        let ot = this;
        window.jQuery('input[id="fromToFLDF"]').daterangepicker({   
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        } , function(start, end, label) {
            ot.setState({
                fromToFLDF : start.format('MM/DD/YYYY'),
                fromTo2FLDF : end.format('MM/DD/YYYY')
            });
             
          });

        
        let _s = this;
        let u = { userkey : sessionStorage.getItem('trcker')};
        console.log(u);
        axios.defaults.withCredentials = true;
        /* axios.get(BASE_URL+'/seller-bookings',u,{
                headers: {
                    Authorization:'JWT ' + sessionStorage.getItem('user-token')
                }
        }) */
            let authstring =  'JWT ' + sessionStorage.getItem('user-token');
            axios({
                method: 'GET',
                data : u,
                url: BASE_URL+'/seller-bookings',
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
                            alert("No results found for this search query.Please try again");
                        }
                        else if(s.code == '+1')
                        {
                            //this.placesArray = this.props.location.state.passedData.error_type;
                            this.props.dispatch(setMyBookings(response.data.error_type));
                            _s.setState({
                                placesArraySeller : response.data.error_type,
                                placesArraySellerCopy : response.data.error_type
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



    changeFilter(e)
    {
        this.setState({
            filterText : e.target.value
        })
    }


    passFilters(nextProps)
    {
        console.log("oh yeahh!",this.props);
        let {filterText,fromToFLDF,fromTo2FLDF} = {...this.state} ;
        console.log(filterText);
        console.log(fromToFLDF);
        console.log(fromTo2FLDF);
        let dbfilters = {
            filterText,
            fromToFLDF,
            fromTo2FLDF
        }
        console.log(dbfilters);
        let temp = [];
        if(this.state.placesArraySellerCopy)
        {
            for(let k = 0 ; k < this.state.placesArraySellerCopy.length ; k++)
            {
                let cd1 = true;
                if(dbfilters['filterText']!='')
                {
                    console.log(this.state.placesArraySellerCopy[k]['headline'].toLowerCase());
                    console.log(dbfilters['filterText'].toLowerCase());
                    cd1 = this.state.placesArraySellerCopy[k]['headline'].toLowerCase().includes(dbfilters['filterText'].toLowerCase())
                
                }
                let cd2 = true;
                let cd3 = true ;
                if(dbfilters['fromToFLDF']!='' && dbfilters['fromTo2FLDF']!='')
                {
                    console.log(parseInt(this.state.placesArraySellerCopy[k]['startDate']));
                    console.log(new Date(dbfilters['fromToFLDF']).getTime() );
                    console.log(new Date(dbfilters['fromTo2FLDF']).getTime() );
                    console.log(parseInt(this.state.placesArraySellerCopy[k]['endDate']));
                    cd2 = (new Date(parseInt(this.state.placesArraySellerCopy[k]['startDate'])).getTime() >= new Date(dbfilters['fromToFLDF']).getTime() );
                    cd3 = (new Date(dbfilters['fromTo2FLDF']).getTime() >= new Date(parseInt(this.state.placesArraySellerCopy[k]['endDate'])).getTime() );
                }
                console.log(cd1);
                console.log(cd2);
                console.log(cd3);
                if(cd1 && cd2 && cd3)
                {
                    temp.push(this.state.placesArraySellerCopy[k]);
                }


            }
        }
        
        this.setState({
            placesArraySeller : temp
        })

    }


    render() {


        //console.log(this.props);
        console.log("this is the console for the dashboard filters",this.props.dashBoardFilters);

        //console.log(this.state);
        return(
           
            
            <div>

                <div className="container">
                    <div className="col-lg-12"><div className="col-lg-12">
                        <h2 className="mybookingsheader">Bookings Received<hr/></h2>
                        
                        <div className="row">
                        <div className="col-lg-12 row filterContainer">
                            
                            <div className="col-lg-5 filterTextContainer">
                                <input type="text"  className="filterTextClass" id="filterText" name="filterText" value={this.state.filterText} onChange={this.changeFilter}  placeholder="Search By Name..."/>
                            </div>
                            <div className="col-lg-5 datafilterHolder">
                                <input type="text" className="form-control filterDates" id="fromToFLDF" placeholder="Arrive" value={this.state.fromToFLDF} onChange={this.changeText}   />
                                <input type="text" className="form-control filterDates" id="fromTo2FLDF" placeholder="Depart" value={this.state.fromTo2FLDF} onChange={this.changeText}   />
                            </div>
                            <div className="col-lg-2">
                                <button type="button" onClick={this.passFilters} className="btn btn-search filterSearch" >Search</button>
                            </div>


                        </div>
                        <div className="col-lg-1">

                        </div>
                    </div>




                        {
                            this.state.placesArraySeller.map(function(player,i) {  
                                console.log(player,"PLATER");
                                return <PropertyComponents key={i} propertyInfo={player}   />
                            })
                        }
                    </div>
                </div>
                </div>
            </div>
            
            
        )
    }
}
 

//export default SellerMyBookings;

const mapStateToProps = (state, props) => {
    console.log(state);
    return state;
  };
//export default HomePage;
export default connect(mapStateToProps)(SellerMyBookings);

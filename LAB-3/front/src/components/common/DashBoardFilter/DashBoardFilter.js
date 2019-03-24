import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import {Link} from 'react-router-dom';
import './DashBoardFilter.css';
import { BASE_URL } from '../AppSettings/AppSettings';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { setDashBoardFilters } from '../../../actions/index';
import { connect } from 'react-redux';
import { setFilterData } from '../../../actions';



window.gotoLogin = function(p){
    if(p=='T')
        window.location.href = "/traveller-login"; 
    else if(p=='S')
        window.location.href = "/seller-login";
}


class DashBoardFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText : '',
            fromTo2FLDF : '',
            fromToFLDF : '',
        }

        this.changeFilter = this.changeFilter.bind(this);
        this.passFilters = this.passFilters.bind(this);
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


    }


    changeFilter(e)
    {
        this.setState({
            filterText : e.target.value
        })
    }

    passFilters()
    {
       console.log(this.state);
       console.log("PASSING FILTERE");
       this.props.dispatch(setDashBoardFilters(this.state));
    }

    resetFilters()
    {
        window.location.reload();
    }


    render() {
        return (
            <div className="container" >
                <div className="row">
                    <div className="col-lg-12 row filterContainer">
                         
                        <div className="col-lg-4 filterTextContainer">
                            <input type="text"  className="filterTextClass" id="filterText" name="filterText" value={this.state.filterText} onChange={this.changeFilter}  placeholder="Search By Name..."/>
                        </div>
                        <div className="col-lg-4 datafilterHolder">
                            <input type="text" className="form-control filterDates" id="fromToFLDF" placeholder="Arrive" value={this.state.fromToFLDF} onChange={this.changeText}   />
                            <input type="text" className="form-control filterDates" id="fromTo2FLDF" placeholder="Depart" value={this.state.fromTo2FLDF} onChange={this.changeText}   />
                        </div>
                        <div className="col-lg-2">
                            <button type="button" onClick={this.passFilters} className="btn btn-search filterSearch" >Search</button>
                        </div>
                        <div className="col-lg-2">
                            <button type="button" onClick={this.resetFilters} className="btn btn-search filterSearch" >Reset</button>
                        </div>


                    </div>
                    <div className="col-lg-1">

                    </div>
                </div>
            </div>


        )
    }
}

//export default SearchFilter;


const mapStateToProps = (state, props) => {
    console.log(state);
    return state;
  };
//export default HomePage;
export default connect(mapStateToProps)(DashBoardFilter);
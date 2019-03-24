import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import {Link} from 'react-router-dom';
import './SearchFilter.css';
import { BASE_URL } from '../AppSettings/AppSettings';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { connect } from 'react-redux';
import { setFilterData } from '../../../actions/index';

const Range = Slider.Range;

window.globalCTX3 = 0;
window.chgCT3 = function(f)
{
    if(f=='-')
        window.globalCTX3 = window.globalCTX3 - 1;
    else if(f=='+')
        window.globalCTX3 = window.globalCTX3 + 1;
    if(window.globalCTX3 < 0)
        window.globalCTX3 = 0;
    
    document.querySelector(".leftToolText").innerHTML = window.globalCTX3 + " guests";
}


window.dismissPP3 = function()
{
    window.jQuery('.popover').popover('hide');
}


window.gotoLogin = function(p){
    if(p=='T')
        window.location.href = "/traveller-login"; 
    else if(p=='S')
        window.location.href = "/seller-login";
}
class SearchFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText : '',
            fromTo2FL : '',
            fromToFL : '',
            min : 0,
            max : 1000,
            currentmin : 0,
            currentmax : 1000
        }

        this.changeFilter = this.changeFilter.bind(this);
        this.passFilters = this.passFilters.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
    }


    componentDidMount()
    {
        let ot = this;
        window.jQuery('input[id="fromToFL"]').daterangepicker({   
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        } , function(start, end, label) {
            ot.setState({
                fromToFL : start.format('MM/DD/YYYY'),
                fromTo2FL : end.format('MM/DD/YYYY')
            });
             
          });


          window.jQuery("#myPopover3").popover({
            title: '',
            content: "<div class='popoverdiv'><span class='leftToolText'>"+window.globalCTX3 +" guests</span><button class='remButton remButton1' type='button' onclick=chgCT3('-')>-</button><button type='button'  onclick=chgCT3('+') class='remButton remButton2'>+</button><div class='subBut' onclick='dismissPP3()'>Apply</div></div>",
            html: true
        });

        window.jQuery('#myPopover3').on('show.bs.popover', function () {
               window.globalCTX3 = 0;
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
        console.log(window.globalCTX3);
        let u = {...this.state};
        u['roomcounter'] = window.globalCTX3;
        this.props.dispatch(setFilterData(u));
        this.props.onFilterUpdate(u);

        
    }


    onSliderChange(value)
    {
        console.log(value[0]);
        console.log(value[1]);
        this.setState({
            currentmin: value[0],
            currentmax: value[1]
        });

    }

    render() {
        return (
            <div className="container" >
                <div className="row">
                    <div className="col-lg-12 row filterContainer">
                         
                        <div className="col-lg-3 filterTextContainer">
                            <input type="text"  className="filterTextClass" value={this.state.filterText} onChange={this.changeFilter}  placeholder="Enter Location"/>
                        </div>
                        <div className="col-lg-2 priceHolder">
                             
                            <Range defaultValue={[0, 1000]} min={this.state.min} max={this.state.max}
                                    onChange={this.onSliderChange}
                                    />
                                 <span className="priceCurrent">   ${this.state.currentmin} - ${this.state.currentmax} </span>
                        </div>
                        <div className="col-lg-3 datafilterHolder">
                            <input type="text" className="form-control filterDates" id="fromToFL" placeholder="Arrive" value={this.state.fromToFL} onChange={this.changeText}   />
                            <input type="text" className="form-control filterDates" id="fromTo2FL" placeholder="Depart" value={this.state.fromTo2FL} onChange={this.changeText}   />
                        </div>
                        <div className="col-lg-2">
                            <div className="input-group justGuests jg2">

                                <a className="guestBox" href="javascript:void(0)" id="myPopover3" data-toggle="popover" data-placement="bottom"    >
                                <div className="cenCont">
                                <i className="material-icons centv">
                                store_mall_directory
                                </i> <span className="gtext">Bedrooms</span></div>
                                </a>

                                </div>
                        </div>
                        <div className="col-lg-2">
                            <button type="button" onClick={this.passFilters} className="btn btn-search filterSearch" >Search</button>
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
export default connect(mapStateToProps)(SearchFilter);
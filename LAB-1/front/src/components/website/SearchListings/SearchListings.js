import React, { Component } from 'react';
import axios from 'axios';
import './SearchListings.css';
import WebsiteHeader from '../../website/WebsiteHeader/WebsiteHeader';
import PropertyComponents from '../../common/PropertyComponent/PropertyComponent';
import cookie from 'react-cookies';

class SearchListings extends React.Component {
    passedData;
    placesArray;
    passedDates;
    constructor(props) {
        super(props);
        console.log(this.props);
        if(!cookie.load('user') || !cookie.load('user'))
        {
            this.props.history.push({
                pathname: '/'
            });
        }
        
        try
        {
            this.passedData = this.props.location.state.passedData.error_type;
            this.passedDates =  this.props.location.state.dateData;
            console.log(this.passedDates);
        }
        catch(e)
        {
                
                let _x = localStorage.getItem("placesObject");
                if(_x === null || _x == [] || _x === undefined)
                {
                    this.passedData = { "code" : "-1" , "error_type" : []};
                }
                else 
                    this.passedData = JSON.parse(_x);

                if(_x === null || _x == [] || _x === undefined)
                {
                    this.passedDates = { fromTo: '', fromTo2: ''}
                }
                else 
                    this.passedDates = JSON.parse(_x);

                if(!this.passedDates)
                {
                    this.passedDates =  { fromTo: '', fromTo2: ''}
                }
        }
        
        if(this.props.location.state.passedData.code == "+1" )
        {
            this.placesArray = this.props.location.state.passedData.error_type;
            localStorage.setItem("placesObject",JSON.stringify(this.passedData));
            localStorage.setItem("dateData",JSON.stringify(this.passedDates));
        }
        else 
            this.placesArray = [];
        console.log(this.passedData);
        console.log(this.placesArray);
        console.log(this.passedDates);
    }

    render(){
        let dataObj = {
            "image" : "blue",
            "headerBackground" :  "white",
            "headerColor" : "black",
            "loggedInNeeded" : true,
        }
        let s = this.passedDates;
        return (
            <div className="ccv">
                <WebsiteHeader headerData={dataObj} />
                <div className="container mainOuterContainer">
                {
                    s.whereTo ? (<div className="row col-lg-12">
                    <div class="col-lg-1"></div><div className="col-lg-11 searchText">Showing search results for <span className="captText">"{s.whereTo}"</span>
                     </div></div>) : null
                }
                
                {
                    this.placesArray.map(function(player,i) {  
                        return <PropertyComponents key={i} propertyInfo={player} dateData={s}  />
                    })
                }
                </div>
            </div>
            );
    }




}

export default SearchListings;
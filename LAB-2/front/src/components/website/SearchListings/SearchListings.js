import React, { Component } from 'react';
import axios from 'axios';
import './SearchListings.css';
import WebsiteHeader from '../../website/WebsiteHeader/WebsiteHeader';
import PropertyComponents from '../../common/PropertyComponent/PropertyComponent';
import cookie from 'react-cookies';
import { BASE_URL, PAGINATION_FACTOR } from '../../common/AppSettings/AppSettings';
import SearchFilter from '../../common/SearchFilter/SearchFilter';
import { connect } from 'react-redux';
import { getPropertyList } from '../../../actions/index';

class SearchListings extends React.Component {
    passedData;
    placesArray;
    passedDates;
    constructor(props) {
        super(props);
        this.props.dispatch(getPropertyList());
        console.log("-/-/-/-/--/");
        console.log(this.props.propertyList);
        try 
        {
            this.state = {
                passedData : [],
                passedDates : { fromTo: '', fromTo2: ''},
                placesArray : [],
                lookahead : false,
                areFiltering : false,
                skip : 0,
                limit : PAGINATION_FACTOR,
                leftbuttonClass : 'btn load-left',
                rightbuttonClass : 'btn load-right',
                showLoader : false,
            }
            console.log(this.props);
            this.loadNext = this.loadNext.bind(this);
            this.filterChange = this.filterChange.bind(this);
        }
        catch(e)
        {
            console.log(e);
        }

    }

    componentDidMount()
    {
        //alert("LOADED");
        //console.log(this.props.propertyList.passedData.error_type);
        if(!sessionStorage.getItem('user') || !sessionStorage.getItem('user'))
        {
            this.props.history.push({
                pathname: '/'
            });
        }
        
        try
        {
            this.setState({
                passedData : this.props.propertyList.passedData.error_type,
                
            });
            console.log("========================");
            console.log(this.state);

            if(this.props.propertyList.passedData.code == "+1" )
            {
                //this.placesArray = this.props.propertyList.passedData.error_type;
                this.setState({
                    placesArray : this.props.propertyList.passedData.error_type,
                    passedDates : this.props.propertyList.dateData,
                    lookahead : this.props.propertyList.passedData.lookahead
                });
                //setTimeout()
                localStorage.setItem("dateData",JSON.stringify(this.props.propertyList.dateData));
               
            }
            else 
            {
                this.setState({
                    placesArray : [],
                    lookahead : false
                });
                console.log(this.passedData);
                console.log(this.placesArray);
                console.log(this.passedDates);
            }
            
        }
        catch(e)
        {
            
            console.log(e);
            let _u = localStorage.getItem("dateData");
            _u['skip']  = this.state.skip;
            _u['limit'] = this.state.limit;
            axios.defaults.withCredentials = true;
            //axios.post(BASE_URL+'/search-data',_u)
            let authstring =  'JWT ' + sessionStorage.getItem('user-token');
            axios({
                method: 'POST',
                data : _u,
                url: BASE_URL+'/search-data',
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
                                console.log(s);
                                /* this.props.history.push({
                                    pathname: '/property/search',
                                    state: { passedData: response.data , dateData : u  }
                                }); */
                                
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
        
        
    }


    loadNext(tp)
    {
        console.log(tp);
        let outerthis = this;
        
        try
        {
            
            let _u = JSON.parse(localStorage.getItem("dateData"));
            
            let deciderObject = false;
            if(this.state.areFiltering)
            {
                deciderObject =  this.props.filterData;
                deciderObject['isFilters']   = true;
            }
            else 
            {
                deciderObject = _u;
                deciderObject['isFilters']   = false;
            }
            if(tp == '+')
            {
                if(this.state.lookahead)
                {
                    deciderObject['skip'] = deciderObject['skip'] + deciderObject['limit'];
                    this.setState({
                        showLoader : true
                    });
                }
                else
                {
                    return false;
                }
            }
            else if(tp == '-')
            {
                deciderObject['skip'] = deciderObject['skip'] - deciderObject['limit'];
                this.setState({
                    showLoader : true
                });
            }
            if(deciderObject['skip'] <= 0 )
            deciderObject['skip'] = 0;

            

            
            console.log(deciderObject);
            axios.defaults.withCredentials = true;
                //axios.post(BASE_URL+'/search-data',deciderObject)
                let authstring =  'JWT ' + sessionStorage.getItem('user-token');
                axios({
                    method: 'POST',
                    data : deciderObject,
                    url: BASE_URL+'/search-data',
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
                                    
                                    localStorage.setItem("dateData",JSON.stringify(_u));
                                    console.log(s);
                                    console.log(this.state.placesArray);
                                    
                                    if(s.lookahead == false && s.error_type.length <= PAGINATION_FACTOR)
                                    {
                                        outerthis.setState((prevState, props) => ({
                                            lookahead : s.lookahead,
                                            placesArray : s.error_type,//prevState.placesArray.concat(s.error_type),
                                            rightbuttonClass : 'btn load-right disable-button',
                                            showLoader : false
                                        }));
                                    }
                                    else
                                    {
                                        outerthis.setState((prevState, props) => ({
                                            skip : prevState.skip + prevState.limit,
                                            lookahead : s.lookahead,
                                            placesArray : s.error_type,//prevState.placesArray.concat(s.error_type),
                                            rightbuttonClass : 'btn load-right',
                                            showLoader : false
                                        }));
                                    }

                                }   
        
                            }
                            catch(e)
                            {
                                console.log(e);
                                this.setState({
                                    showLoader : false
                                });
                            }
                        }else{
                            this.setState({
                                showLoader : false
                            })
                        }   
                    });
            /* }
            else 
            {
                console.log("NO LOAD NEXT VALUE FOUND");
            } */
            
        }
        catch(e)
        {
            console.log(e);
        }
        
    }

    filterChange(ph)
    {
        
        console.log(ph);
        
        
        if(ph['filterText']!=''){

            var passedDates = {...this.state.passedDates}
            passedDates.whereTo = ph['filterText'];

            this.setState({
                areFiltering : true,
                whereTo : ph['filterText'],
                passedDates
            });
        }
        else
        {
            this.setState({
                areFiltering : true,
                whereTo : ''
            });
        }
        
        let outerthis = this;
        


        let _u = JSON.parse(localStorage.getItem("dateData"));
            
            ph['skip'] = 0;
            ph['limit'] = this.state.limit;
            
            ph['isFilters']   = true;
            console.log(ph);
            axios.defaults.withCredentials = true;
                //axios.post(BASE_URL+'/search-data',ph)
                let authstring =  'JWT ' + sessionStorage.getItem('user-token');
                axios({
                    method: 'POST',
                    data : ph,
                    url: BASE_URL+'/search-data',
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
                                    localStorage.setItem("dateData",JSON.stringify(_u));
                                    /* outerthis.setState((prevState, props) => ({
                                        placesArray : prevState.placesArray.concat(s.error_type)
                                    })); */

                                    /* outerthis.setState((prevState, props) => ({
                                        placesArray : s.error_type
                                    }));
 */
                                    if(s.lookahead == false && s.error_type.length <= PAGINATION_FACTOR)
                                    {
                                        outerthis.setState((prevState, props) => ({
                                            lookahead : s.lookahead,
                                            placesArray : s.error_type,//prevState.placesArray.concat(s.error_type),
                                            rightbuttonClass : 'btn load-right disable-button',
                                            showLoader : false
                                        }));
                                    }
                                    else
                                    {
                                        outerthis.setState((prevState, props) => ({
                                            skip : prevState.skip + prevState.limit,
                                            lookahead : s.lookahead,
                                            placesArray : s.error_type,//prevState.placesArray.concat(s.error_type),
                                            rightbuttonClass : 'btn load-right',
                                            showLoader : false
                                        }));
                                    }

                                } 
        
                            }
                            catch(e)
                            {
                                console.log(e);
                            }
                        }else{
                            console.log("asdnoerr");
                        }   
                    });
    }

    render(){
            
        console.log("RENDER STATE",this.state);
        let dataObj = {
            "image" : "blue",
            "headerBackground" :  "white",
            "headerColor" : "black",
            "loggedInNeeded" : true,
        }
        let s = this.state;
        console.log(s);
        return (
            <div className="ccv">
                <WebsiteHeader headerData={dataObj} />
                <div className="container mainOuterContainer">
                <SearchFilter onFilterUpdate={this.filterChange} ></SearchFilter>

                {
                    s.whereTo ? (<div className="row col-lg-12">
                    <div class="col-lg-1"></div><div className="col-lg-11 searchText">Showing search results for <span className="captText">"{s.whereTo}"</span>
                     </div></div>) : null
                }
                
                {
                    this.state.placesArray.map(function(player,i) {  
                        return <PropertyComponents key={i} propertyInfo={player} dateData={s}  />
                    })
                }

                {
                    (
                        <div className="col-lg-12 text-center">
                            
                            <div className="col-lg-12">
                                <button type="button" className={this.state.leftbuttonClass} onClick={()=>this.loadNext('-')} >
                                    <i class="fas fa-chevron-left"></i>
                                </button>

                                <button type="button" className={this.state.rightbuttonClass} onClick={()=>this.loadNext('+')} >
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                             
                            {
                                this.state.showLoader && <img src={require('../../../images/30.gif')} alt="HomeAway" />
                            }
                        </div>
                    )
                }



                </div>
            </div>
            );
    }




}


const mapStateToProps = (state, props) => {
    
    console.log(state);
    return state;
  };
//export default HomePage;
export default connect(mapStateToProps)(SearchListings);
//export default SearchListings;
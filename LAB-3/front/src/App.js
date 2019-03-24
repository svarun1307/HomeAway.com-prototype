import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Route} from 'react-router-dom';
import Login from './components/seller/Login/Login';
import SignUp from './components/seller/SignUp/SignUp';
import SellerDashBoard from './components/seller/SellerDashBoard/SellerDashBoard'
import SellerDashBoardHeader from './components/common/SellerDashBoardHeader/SellerDashBoardHeader'
import SellerAdd from './components/seller/SellerAdd/SellerAdd';
import Profile from './components/seller/profile/Profile';
import WebsiteHeader from './components/website/WebsiteHeader/WebsiteHeader';
import HomePage from './components/website/HomePage/HomePage';
import SearchListing from './components/website/SearchListings/SearchListings';
import PropertyDetails from './components/website/PropertyDetails/PropertyDetails';
import TravellerLogin from './components/traveller/Login/Login';
import TravellerSignUp from './components/traveller/SignUp/SignUp';
import TravellerDashBoard from './components/traveller/TravellerDashBoard/TravllerDashBoard';
import TravellerDashBoardHeader from './components/common/TravellerDashBoardHeader/TravellerDashBoardHeader';
import TravellerMyBookings from './components/traveller/TravellerMyBookings/TravellerMyBookings';
import SellerMyBookings from './components/seller/SellerMyBookings/SellerMyBookings';
import PublicProfiles from './components/website/PublicProfiles/PublicProfiles';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
//import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import reducer from "./reducers";
import SellerQuestions from './components/seller/SellerQuestions/SellerQuestions';
import TravellerQuestions from './components/traveller/TravellerQuestions/TravellerQuestions';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from 'redux-persist/es/integration/react';
import StateLoader from "./store-actions";
import thunk from 'redux-thunk';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';



// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
});



const stateLoader = new StateLoader();

//middleware settings
// To resolve promise to store we use apply
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(reducer, stateLoader.loadState(), composePlugin(applyMiddleware(promise,thunk)));


store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

class App extends Component {
  render() {
    return (
      /*** Setting up routes for BrowserRouter ***/
       //Use Browser Router to route to different pages
       <ApolloProvider client={client}>
          <Provider store={store}>
              <BrowserRouter>
              
                  <div>
                    
                    {/***************SELLER LOGIN ROUTES*****************/}
                    <Route path="/seller-login" component={Login}/>
                    <Route path="/seller-sign-up" component={SignUp}/>

                    {/***************TRAVELLER LOGIN ROUTES*****************/}
                    <Route path="/traveller-login" component={TravellerLogin}/>
                    <Route path="/traveller-sign-up" component={TravellerSignUp}/>
                    
                    
                    {/***************SELLER ROUTES*****************/}
                    <Route path="/seller" component={SellerDashBoardHeader}/>
                    <Route exact path="/seller/dashboard" component={SellerDashBoard}/>
                    <Route exact path="/seller/add-property" component={SellerAdd}/>
                    <Route exact path="/seller/bookings" component={SellerMyBookings}/>
                    <Route exact path="/seller/questions" component={SellerQuestions}/>

                    
                    {/***************TRAVELLER ROUTES*****************/}
                    <Route path="/traveller" component={TravellerDashBoardHeader}/>
                    <Route exact path="/traveller/dashboard" component={TravellerDashBoard}/>
                    <Route exact path="/traveller/bookings" component={TravellerMyBookings}/>
                    <Route exact path="/traveller/questions" component={TravellerQuestions}/>


                    {/***************COMMON ROUTES FOR PROFILE*****************/}
                    <Route path="/seller/user-profile" component={Profile}/>
                    <Route path="/traveller/user-profile" component={Profile}/>

                    {/***************WEBSITE ROUTES*****************/}
                    <Route path="/property/search" component={SearchListing}/>
                    <Route path="/property-details/:id/:d1/:d2/:d3" component={PropertyDetails}/>
                    <Route path="/public-profiles/:id" component={PublicProfiles}/>


                    <Route exact path="/" component={HomePage}/>
                    
                  </div>
                  
            </BrowserRouter>
            
        </Provider>
     </ApolloProvider>
    );
  }
}

export default App;

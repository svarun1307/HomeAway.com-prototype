import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Route} from 'react-router-dom';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      /*** Setting up routes for BrowserRouter ***/
       //Use Browser Router to route to different pages
       <BrowserRouter>
       <div>
         
         <Route exact path="/" component={Home}/>
         
       </div>
     </BrowserRouter>
    );
  }
}

export default App;
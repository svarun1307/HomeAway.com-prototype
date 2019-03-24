import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import SellerDashBoardHeader from '../../common/SellerDashBoardHeader/SellerDashBoardHeader';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './TravellerDashBoard.css';
import {Redirect} from 'react-router-dom';

class TravellerDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goToAdd : false
        }
        this.clis = this.clis.bind(this);
    }

    clis()
    {
        this.setState({
            goToAdd : true
        })
    }


    render() {

        let redirect1 = null;
        if(this.state.goToAdd)
        {
            redirect1 = ( <Redirect to="/traveller/bookings"  />);        
        }


        return(
           
            
            <div>
                 {
                    redirect1
                }
                <div className="sellerWelcom" >
                    <i className="material-icons">location_city</i>
                    <div className="headerFont" >Welcome to HomeAway. Earn Money from your property now.</div>
                    <div >
                        <Button className="goToButton" variant="contained" color="primary" onClick={this.clis}  >
                            View My Bookings
                        </Button>
                    </div>

                </div>
            </div>
            
            
        )
    }
}
 

export default TravellerDashBoard;

import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import {Link} from 'react-router-dom';
import { BASE_URL } from '../AppSettings/AppSettings';

const bodyStyles = {
    textAlign: 'center',
    fontWeight: 'bold',
    width : '100%'
}

window.gotoLogin = function(p){
    if(p=='T')
        window.location.href = "/traveller-login"; 
    else if(p=='S')
        window.location.href = "/seller-login";
}
class LoginHeader extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div >
                <nav className="navbar navbar-expand-lg navbar-light dbr-login-navbar">
                    <div className="container">
                        <Link className="navbar-brand" href="javascript:void(0)" to="/">
                           <img src={require('../../../images/logo-login.svg')} alt="HomeAway" />
                        </Link>
                        <img src={require('../../../images/birdhouse-bceheader.svg')} alt="HomeAway" />
                    </div>
                </nav>

                 
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header"  >
                                        <h5 className="modal-title" id="exampleModalLabel" style={bodyStyles}></h5>
                                        
                                    </div>
                                    <div className="modal-body" style={bodyStyles}>
                                        ...
                                     </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                </div>

            </div>


        )
    }
}

export default LoginHeader;
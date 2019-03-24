import React, { Component } from 'react';
import axios from 'axios';



class GuestHolder extends React.Component {

    constructor(props)
    {
        super(props);
        console.log(this.props);

    }

    render()
    {
        return (
            <h2>YES!</h2>
        );
    }


}

export default GuestHolder;
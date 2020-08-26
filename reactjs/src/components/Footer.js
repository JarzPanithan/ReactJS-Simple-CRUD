import React, { Component } from 'react';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css';

class Footer extends Component {
    render() {
        return (
            <div className="container-fluid footerWeb">
                <FontAwesomeIcon icon={faCopyright} className="icon"/>
                &nbsp;
                <span className="copyRight">Panithan Ponpadung, 2020</span>
            </div>
        );
    }
}

export default Footer;
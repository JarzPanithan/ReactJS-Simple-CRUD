import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../img/reactjs.png';

class HeaderNavbar extends Component {
    render() { 
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                    &nbsp;
                    <span>ReactJS & Node.js</span>
                </Navbar.Brand>
            </Navbar>
        );
    }
}
 
export default HeaderNavbar;
import React from 'react';
import { NavLink} from 'react-router-dom';

import AuthContext from  '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                        <div className="main-navigation_logo">
                            <h1>ClinicConnect</h1>
                        </div>
                        <nav className ="main-navigation_items">
                            <ul id="nav_menu">
                                <li>
                                    <NavLink to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about">About Us</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/insurance">Insurance</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/events">Events</NavLink>
                                </li>
                                {context.token && (<li>
                                    <NavLink to="/bookings">Bookings</NavLink>
                                </li>)}
                                {!context.token && (<li>
                                    <NavLink to="/auth">Authenticate</NavLink>
                                </li>)}
                            </ul>
                        </nav>
        </header>
            )
        }}
        
    </AuthContext.Consumer>
 
);

export default mainNavigation;
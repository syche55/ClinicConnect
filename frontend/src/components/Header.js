import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import './Header.css';


function Header() {
  return (
    <div className='header-container'>
        <h1>Clinic Connect</h1>
        <p>Schedule Your appointment Online</p>
        <div className="header-btn">
        <Link to='/auth'>
          <button type="button" >GET STARTED</button>
          </Link>
        </div>
      </div>
  );
}

export default Header;
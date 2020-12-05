import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Header.css';


function Header() {
  return (
    <div className='header-container'>
        <h1>Clinic Connect</h1>
        <p>Schedule Your appointment Online</p>
        <div className='header-btns'>
            <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            path='/auth'
            >
            GET STARTED
            </Button>
      </div>
    </div>
  );
}

export default Header;
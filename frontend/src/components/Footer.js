import React from 'react';
import './Footer.css';
import { Button } from './Button';


function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-contact'>
        <p className='footer-contact-heading'>
        2098 Walsh Ave Suite B, Santa Clara, CA 95050
        </p>
        <div>
          <form className="footer-form">
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <textarea
              className='footer-info'
              name='text'
              type='text'
              placeholder='Your Request'
            />
            <Button buttonStyle='btn--outline'>Contact  Us</Button>
          </form>
        </div>
        <div className='rights-inline'>
          <small className='phone'>Tel: 123-456-7890</small>
        <small className='website-rights'>ClinicConnect © 2020 </small>
        </div>
        
      </section>
    </div>
  );
}

export default Footer;
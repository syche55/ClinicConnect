import React from 'react';
import '../App.css';
import Footer from '../components/Footer';
import Box from '../components/Box';
import Sections from '../components/Sections';
import './About.css';


function AboutPage() {
  return (
    <>

    <Box text='About Us'/>
    <h1 className='insurance_title'>Providing you with the best doctors for the best care</h1>
    <Sections />
    <Box text='Contact Us'/>
      <Footer />
    </>
  );
}

export default AboutPage;
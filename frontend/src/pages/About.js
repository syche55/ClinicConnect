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
    <h1 className='insurance_title'>About Clinic:</h1>
    <p className='insurance_detail'>Whether you’re considering insurance through your employer or purchasing coverage on your own, we can help guide you through your different options so you can get the coverage you need.</p>
    <Sections />
    <p className='insurance_detail'>Not covered by any of these plans? Contact us and we will find the best solution to suit you. </p>
      <Footer />
    </>
  );
}

export default AboutPage;
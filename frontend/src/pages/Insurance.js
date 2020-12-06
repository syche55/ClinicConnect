import React from 'react';
import '../App.css';
import Footer from '../components/Footer';
import Box from '../components/Box';
import './Insurance.css';


function InsurancePage() {
  return (
    <>
    <Box text='Insurance Plans'/>
    <h1 className='insurance_title'>Health plans which we accept:</h1>
    <p className='insurance_detail'>Whether you’re considering insurance through your employer or purchasing coverage on your own, we can help guide you through your different options so you can get the coverage you need.</p>
    <div className='insurance_container'>
      <ul className='insurance_type'>
      <li><a href='https://www.aetna.com/'>Aetna</a></li>
      <li><a href='https://www.bluecrossma.org/'>Blue Cross/Blue Shield</a></li>
      <li><a href='https://www.cigna.com/'>Cigna Health</a></li>
      <li><a  href='https://www.humana.com/'>Humana</a></li>
      <li><a  href='https://healthy.kaiserpermanente.org/'>Kaiser</a></li>
      <li><a  href='https://www.uhc.com/'>United Health Care</a></li>
      <li><a  href='https://www.harvardpilgrim.org/'>Harvard Pilgrim Health Care</a></li>
      <li><a  href='https://www.cdphp.com/'>Capital District Physicians' Health Plan (CDPHP, CDPHN)</a></li>
    </ul>

    </div>
    
    <p className='insurance_detail'>Not covered by any of these plans? Contact us and we will find the best solution to suit you. </p>
      <Footer />
    </>
  );
}

export default InsurancePage;
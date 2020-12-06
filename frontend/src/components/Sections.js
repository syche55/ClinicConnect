import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Sections() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='https://i.ibb.co/M1q2Tb3/joyce-mccown-IG96-K-Hi-Dk0-unsplash.jpg'
              text='Chiropractic'
              label='Book Now ~ $80'
              detail='Chiropractic is a pseudoscientific[1] complementary and alternative medicine (CAM)[2] that is concerned with the diagnosis and treatment of mechanical disorders of the musculoskeletal system, especially the spine.'
              path='/availability'
            />
            <CardItem
              src='https://i.ibb.co/ZThynNz/5479.jpg'
              text='TCM physiotherapy'
              label='Book Now ~ $60'
              detail='The practice includes various forms of herbal medicine, acupuncture, cupping therapy, gua sha, massage (tui na), bonesetter (die-da), exercise (qigong), and dietary therapy.'
              path='/availability'
            />
            <CardItem
              src='https://i.ibb.co/Wx3DfTw/geert-pieters-3-Rnk-Zp-Dqs-EI-unsplash.jpg'
              text='Recovery physiotherapy'
              label='Book Now ~ $45'
              detail='Physical therapy is used to improve a patients physical functions through physical examination, diagnosis, prognosis, patient education, physical intervention, rehabilitation, disease prevention and health promotion.'
              path='/availability'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sections;
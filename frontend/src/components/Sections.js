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
              src='https://i.ibb.co/7XY0KvZ/ashjkd.png'
              text='Chiropractic'
              label='Book Now'
              detail='$80'
              path='/availability'
            />
            <CardItem
              src='https://i.ibb.co/SdKRBRB/dfgsdf.png'
              text='TCM physiotherapy'
              label='Book Now'
              detail='$60'
              path='/availability'
            />
            <CardItem
              src='https://i.ibb.co/SdKRBRB/dfgsdf.png'
              text='Recovery physiotherapy'
              label='Book Now'
              detail='$45'
              path='/availability'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sections;
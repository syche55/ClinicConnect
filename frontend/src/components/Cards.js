import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src= 'https://i.ibb.co/M1q2Tb3/joyce-mccown-IG96-K-Hi-Dk0-unsplash.jpg'
              text='Chiropractic Department'
              label='Chiropractic'
              path='/availability'
            />
            <CardItem
            src='https://i.ibb.co/ZThynNz/5479.jpg'
              text='TCM physiotherapy Department'
              label='TCM physiotherapy'
              path='/availability'
            />
            <CardItem
              src='https://i.ibb.co/Wx3DfTw/geert-pieters-3-Rnk-Zp-Dqs-EI-unsplash.jpg'
              text='Recoverary Physiotherapy Department'
              label='Recoverary Physiotherapy'
              path='/availability'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
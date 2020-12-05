import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Infos() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='https://i.ibb.co/7XY0KvZ/ashjkd.png'
              text='Health Plans We Accept'
              label='Read More'
              detail='Details about health plans which we accept. Not covered by any of these plans? Contact us and we will find the best solution to suit you.  '
              path='/insurance'
            />
            <CardItem
              src='https://i.ibb.co/SdKRBRB/dfgsdf.png'
              text='Spcialist Doctors'
              label='Read More'
              detail='Want to talk to a specilist? Find out the doctor suit you!'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Infos;
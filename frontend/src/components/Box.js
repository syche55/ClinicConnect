import React from 'react';
import '../App.css';
import './Box.css';


function Box(props) {
  return (
    <div className='box'>
        <h1>{props.text}</h1>
    </div>
  );
}

export default Box;
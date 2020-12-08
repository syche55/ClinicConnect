import React from 'react';

import SingleAvailability from './SingleAvailability/SingleAvailability';

import './AvailabilityList.css';
import singleAvailability from './SingleAvailability/SingleAvailability';

const availabilityList = props => {
    const availabilityLists = props.availability
        .sort((a, b) => new Date(a.date).getTime() - 
        new Date(b.date).getTime())
        .filter(singleAvailability => !singleAvailability.booked)
        .map(singleAvailability => {
        
        return (
            <SingleAvailability 
            key={singleAvailability._id}
            myId={singleAvailability._id}
            availabilityId={props.onClickAvailability} 
            title={singleAvailability.title}
            userIsDoctor={props.authUserIsDoctor}
            price={singleAvailability.price}
            date={singleAvailability.date}
            booked={singleAvailability.booked}/>
        );
}); 
    return (<ul className="availability__list">{availabilityLists}</ul>);
};  

export default availabilityList;
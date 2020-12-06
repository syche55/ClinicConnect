import React from 'react';

import SingleAvailability from './SingleAvailability/SingleAvailability';

import './AvailabilityList.css';

const availabilityList = props => {
    const availabilityLists = props.availability.map(singleAvailability => {
        // console.log(singleAvailability);
        return (
            <SingleAvailability 
            key={singleAvailability._id}
            myId={singleAvailability._id}
            availabilityId={props.onClickAvailability} 
            title={singleAvailability.title}
            userIsDoctor={props.authUserIsDoctor}
            price={singleAvailability.price}
            date={singleAvailability.date}/>
        );
});
    return (<ul className="availability__list">{availabilityLists}</ul>);
};  

export default availabilityList;
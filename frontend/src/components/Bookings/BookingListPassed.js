import React from "react";

import "./BookingListPassed.css";

const bookingListPassed = (props) => (
  <ul className="bookings__list">
    {props.bookings
    .sort((a, b) => new Date(a.availability.date).getTime() - 
    new Date(b.availability.date).getTime())
    .filter(booking => new Date(booking.availability.date) - new Date() <= 0)
    .map((booking) => {
      return (
        <li key={booking._id} className="bookings__item">
          <div className="bookings__item-data">
            {booking.availability.title} -{" "}
            {new Date(booking.availability.date).toLocaleDateString()}
          </div>
          
        </li>
      );
    })}
  </ul>
);

export default bookingListPassed;

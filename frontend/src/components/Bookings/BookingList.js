import React from "react";

import "./BookingList.css";

const bookingList = (props) => (
  <ul className="bookings__list">
    {props.bookings
    .sort((a, b) => new Date(a.availability.date).getTime() - 
    new Date(b.availability.date).getTime())
    .filter(booking => new Date(booking.availability.date) - new Date() > 0)
    .map((booking) => {
      return (
        <li key={booking._id} className="bookings__item">
          <div className="bookings__item-data">
            {booking.availability.title} -{" "}
            {booking.availability.description}
            {new Date(booking.availability.date).toLocaleDateString()}
          </div>
          <div className="bookings__item-actions">
            <button
              className="btn--small"
              onClick={props.onDelete.bind(this, booking._id)}
            >
              Cancel
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default bookingList;

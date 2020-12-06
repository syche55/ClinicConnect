import React from "react";

import "./SingleAvailability.css";

const singleAvailability = (props) => (
  <li key={props.myId} className="availability__list-item">
    <div>
      <h4>{props.title}</h4>
      <h5>
        ${props.price} - {new Date(props.date).toLocaleDateString()}{" "}
      </h5>
    </div>
    <div>
      {!props.userIsDoctor && (
        <button
          className="btn--small"
          onClick={() => props.availabilityId(props.myId)}
        >
          Book
        </button>
      )}
    </div>
  </li>
);

export default singleAvailability;

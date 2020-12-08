import React, { Component } from "react";
import AuthContext from "../context/auth-context";
import Box from "../components/Box";
import BookingList from "../components/Bookings/BookingList";
import BookingListPassed from "../components/Bookings/BookingListPassed";

import './Bookings.css';

class BookingsPage extends Component {
  state = {
    bookings: [],
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  

  fetchBookings = () => {
    const requestBody = {
      query: `
              query {
                bookings{
                    _id
                    createdAt
                    availability{
                      _id
                      title
                      date
                      booked
                    }
                }
              }
            `,
    };
    //   console.log(JSON.stringify(requestBody));
    const token = this.context.token;
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const bookings = resData.data.bookings;
        this.setState({ bookings: bookings});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteBookingHandler = (bookingId) => {
    const requestBody = {
      query: `
              mutation {
                cancelBooking(bookingId: "${bookingId}"){
                    _id
                    title
                }
              }
            `,
    };
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        window.alert("Successfully canceled!")
        return res.json();
      })
      .then((resData) => {
        this.setState((prevState) => {
          const updatedBookings = prevState.bookings.filter((booking) => {
            return booking._id !== bookingId;
          });
          
          return { bookings: updatedBookings };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      
      <React.Fragment>
        <Box text="Your Bookings" />
        <h2 class="greeting">Hello,  {this.context.firstName}</h2>
        {this.state.bookings.length === 0 && 
        <h3>You do not have any bookings, please checkout the Availability page to book one!</h3>}
        <h3>Upcoming Bookings</h3>
        <BookingList
          bookings={this.state.bookings}
          onDelete={this.deleteBookingHandler}
        />
        <h3>Passed Bookings</h3>
        <BookingListPassed 
        bookings={this.state.bookings}
        />
      </React.Fragment>

      
    );
  }
}

export default BookingsPage;

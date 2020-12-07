import React, { Component } from "react";
import AuthContext from "../context/auth-context";
// import Spinner from "../components/Spinner/Spinner";
import BookingList from "../components/Bookings/BookingList";
import './Bookings.css';

class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: [],
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({ isLoading: true });
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
        this.setState({ bookings: bookings, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteBookingHandler = (bookingId) => {
    this.setState({ isLoading: true });
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
        this.setState((prevState) => {
          const updatedBookings = prevState.bookings.filter((booking) => {
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings, isLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.context.firstName);
    return (
      
      <React.Fragment>
        <h1 class="greeting">Hello,</h1>
        <BookingList
          bookings={this.state.bookings}
          onDelete={this.deleteBookingHandler}
        />
      </React.Fragment>
    );
  }
}

export default BookingsPage;

import React, { Component } from "react";
import "./Availability.css";

import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import AuthContext from "../context/auth-context";
import AvailabilityList from "../components/Availability/AvailabilityList/AvailabilityList";
import availabilityList from "../components/Availability/AvailabilityList/AvailabilityList";

class AvailabilityPage extends Component {
  state = {
    creating: false,
    availabilityLists: [],
    isLoading: false,
    selectedAvailability: null,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.descriptionElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
  }

  startCreateAvailabilityHandler = () => {
    this.setState({ creating: true });
  };

  componentDidMount() {
    this.fetchAvailability();
  }

  startCreateAvailabilityHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;

    // validate input
    if (
      title.trim().length === 0 ||
      price < 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
              mutation {
                createAvailability(availabilityInput: {title: "${title}", description: "${description}", price:${price}, date:"${date}"}) {
                    _id
                    title
                    description
                    price
                    date
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
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        this.fetchAvailability();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  bookEventHandler = (bookedSingleAvailabilityId) => {
    const selected = this.state.availabilityLists.find(
      (a) => a._id === bookedSingleAvailabilityId
    );
    this.state.selectedAvailability = selected;
    console.log(this.state);
    const requestBody = {
      query: `
              mutation {
                bookAvailability(availabilityId: "${selected._id}", userId:"${this.context.userId}") {
                    _id
                    createdAt
                    updatedAt
                }
              }
            `,
    };
    console.log(JSON.stringify(requestBody));
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
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchAvailability() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
              query {
                availability {
                    _id
                    title
                    description
                    price
                    date
                }
              }
            `,
    };
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const availabilityLists = resData.data.availability;
        //   console.log(availabilityLists);
        this.setState({
          availabilityLists: availabilityLists,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    // render data display

    return (
      <React.Fragment>
        <h2>Availability</h2>
        {this.state.creating && <Backdrop />}

        {this.context.isDoctor && (
          <div className="events-control">
            <p>Add new time slots for the patients to book.</p>
            <button
             
              onClick={this.startCreateAvailabilityHandler}
            >
              Create an Availability
            </button>
          </div>
        )}
        {!this.context.isDoctor && (
          <p>Select from below to book a new appointment.</p>
        )}

        {this.state.creating && (
          <Modal
            title="Add Availability"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef}></input>
              </div>
              <div className="form-control">
                <label htmlFor="title">Description</label>
                <input
                  type="text"
                  id="description"
                  ref={this.descriptionElRef}
                ></input>
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="title" ref={this.priceElRef}></input>
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input
                  type="datetime-local"
                  id="date"
                  ref={this.dateElRef}
                ></input>
              </div>
            </form>
          </Modal>
        )}

        {this.state.isLoading ? (
          <p> Loading... </p>
        ) : (
          <AvailabilityList
            availability={this.state.availabilityLists}
            authUserIsDoctor={this.context.isDoctor}
            onClickAvailability={this.bookEventHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default AvailabilityPage;

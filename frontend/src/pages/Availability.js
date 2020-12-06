import React, { Component } from "react";
import "./Availability.css";

import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import AuthContext from "../context/auth-context";
class AvailabilityPage extends Component {
  state = {
    creating: false,
    availabilitys: [],
    testing: false,
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
    const newAvailability = { title, description, price, date };

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

  fetchAvailability() {
    const requestBody = {
      query: `
              query {
                availability{
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
        console.log(resData);
        const availabilitys = resData.data.availability;
        this.setState({ availabilitys: availabilitys });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const availabilityList = this.state.availabilitys.map((availability) => {
      return (
        <li key={availability.__id} className="events__list-item">
          {availability.title}
        </li>
      );
    });
    return (
      <React.Fragment>
        <h1>Availability</h1>
        {this.state.creating && <Backdrop />}
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
        // if is doctor then show
        <div className="events-control">
          <p>Add new time slots for the patients to book.</p>
          <button className="btn" onClick={this.startCreateAvailabilityHandler}>
            Create an Availability
          </button>
        </div>
        <ul className="events__list">
          {availabilityList.map((availability, index) => (
            <li>{availability}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default AvailabilityPage;

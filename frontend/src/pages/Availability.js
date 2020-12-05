import React, {Component} from 'react';
import './Availability.css';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
class AvailabilityPage extends Component{
    state = {
        creating: false
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
        this.setState({creating: true});
    }

    modalConfirmHandler = () => {
        this.setState({creating: false});
        const title = this.titleElRef.current.value;
        const price = +this.priceElRef.current.value;
        const date = this.dateElRef.current.value;
        const description = this.descriptionElRef.current.value;

        // validate input
        if (title.trim().length ===0 || price < 0 || date.trim().length===0 || description.trim().length===0) {
            return;
        }
        const newAvailability = {title, description, price, date};

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
            `
          };
        //   console.log(JSON.stringify(requestBody));
          const token = this.context.token;
          fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
          })
            .then(res => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
              }
              return res.json();
            })
            .then(resData => {
              console.log(resData);
            })
            .catch(err => {
              console.log(err);
            });
        
    };
    modalCancelHandler = () => {
        this.setState({creating: false});
    };
    fetchAvailability() {
        
    }


    
    render(){
        return (
        <React.Fragment>
            <h1>Availability</h1>
            {this.state.creating && <Backdrop />}
            {this.state.creating && <Modal title="Add Availability" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
                <form>
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" ref={this.titleElRef}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="title">Description</label>
                        <input type="text" id="description" ref={this.descriptionElRef}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="title" ref={this.priceElRef}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="date">Date</label>
                        <input type="datetime-local" id="date" ref={this.dateElRef}></input>
                    </div>
                </form>
            </Modal>}

            <div className="events-control">
            <p>Add new time slots for the patients to book.</p>
            <button className="btn" onClick={this.startCreateAvailabilityHandler}>Create an Availability</button>
            </div>
            
        </React.Fragment>
        );
    }
}

export default AvailabilityPage;
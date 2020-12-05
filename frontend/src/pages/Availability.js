import React, {Component} from 'react';
import './Availability.css';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

class AvailabilityPage extends Component{
    state = {
        creating: false
    };

    startCreateAvailabilityHandler = () => {
        this.setState({creating: true});
    }

    modalConfirmHandler = () => {
        this.setState({creating: false});
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
                        <input type="text" id="title"></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="title">Description</label>
                        <input type="text" id="description"></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="title"></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date"></input>
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
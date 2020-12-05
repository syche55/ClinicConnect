import React, {Component} from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';


import HomePage from './pages/Home';
import AuthPage from './pages/Auth';
import AboutPage from './pages/About'
import BookingsPage from './pages/Bookings';
import EventssPage from './pages/Events';
import MainNavigation from  './components/Navigation/MainNavigation';
import InsurancePage from './pages/Insurance';
import AuthContext from  './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({token:token, userId: userId});
  };

  logout = () => {
    this.setState({token:null, userId: null});
  };

  render(){
    return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider 
          value={{
            token: this.state.token, 
            userId: this.state.userId, 
            login: this.login, 
            logout: this.logout
          }}
        >
          <MainNavigation />
            <main className="main-content">
                <Switch>
                  {/* INCOMPLETE!! some code for booking should be show or not for !login user */}
                  {/* {!this.state.token && <Redirect from="/" to="/auth" exact/>}
                  {this.state.token && <Redirect from="/" to="/events" exact/>}
                  {this.state.token && <Redirect from="/auth" to="/events" exact/>} */}
                  <Route path="/" exact component ={HomePage} />
                  <Route path="/about" component ={AboutPage} />
                  {!this.state.token && (<Route path="/auth" component ={AuthPage} />)}
                  <Route path="/events" component ={EventssPage} />
                  <Route path="/insurance" component ={InsurancePage} />
                  {this.state.token && (<Route path="/bookings" component ={BookingsPage} />)}
              </Switch>
            </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
  }
}

export default App;

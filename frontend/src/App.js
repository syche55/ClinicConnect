import React, {Component} from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import AuthPage from './pages/Auth';
import AboutPage from './pages/About'
import BookingsPage from './pages/Bookings';
import AvailabilityPage from './pages/Availability';
import MainNavigation from  './components/Navigation/MainNavigation';
import InsurancePage from './pages/Insurance';
import AuthContext from  './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    isDoctor: false,
    userId: null
  };

  login = (userId, isDoctor, token, tokenExpiration) => {
    this.setState({token:token, userId: userId, isDoctor: isDoctor});
  };

  logout = () => {
    this.setState({token:null, userId: null, isDoctor: false});
  };

  render(){
    return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider 
          value={{
            token: this.state.token, 
            userId: this.state.userId,
            isDoctor: this.state.isDoctor, 
            login: this.login, 
            logout: this.logout
          }}
        >
          <MainNavigation />
            <main className="main-content">
                <Switch>
                  {!this.state.token && <Redirect from="/bookings" to="/auth" exact/>}

                  {this.state.token && <Redirect from="/" to="/availability" exact/>}
                  {this.state.token && this.state.isDoctor && <Redirect from="/auth" to="/availability" exact/>}
                  {this.state.token && !this.state.isDoctor && <Redirect from="/auth" to="/bookings" exact/>}

                  <Route path="/about" component ={AboutPage} />
                  {!this.state.token && (<Route path="/auth" component ={AuthPage} />)}
                  <Route path="/availability" component ={AvailabilityPage} />
                  <Route path="/insurance" component ={InsurancePage} />
                  {this.state.token && (<Route path="/bookings" component ={BookingsPage} />)}
                  {!this.state.token && <Redirect to="/auth" exact/>}
              </Switch>
            </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
  }
}

export default App;


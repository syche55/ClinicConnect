import React, {Component} from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';


import AuthPage from './pages/Auth';
import AboutPage from './pages/About'
import BookingsPage from './pages/Bookings';
import EventssPage from './pages/Events';
import MainNavigation from  './components/Navigation/MainNavigation';
import InsurancePage from './pages/Insurance';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
            <Switch>
              <Redirect from="/" to="/auth" exact/>
              <Route path="/about" component ={AboutPage} />
              <Route path="/auth" component ={AuthPage} />
              <Route path="/events" component ={EventssPage} />
              <Route path="/insurance" component ={InsurancePage} />
              <Route path="/bookings" component ={BookingsPage} />
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;

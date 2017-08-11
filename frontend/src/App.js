import React, { Component } from 'react';

import {
  BrowserRouter,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import {connect} from 'react-redux'
import Route from './AuthRoute';
import { RouteTransition} from 'react-router-transition';

import LogIn from './components/login/login';
import SignUp from './components/signup/signup';
import Dashboard from './components/dashboard/dashboard';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LogIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/dashboard' component={Dashboard} user={this.props.user} private={true}/>
        </Switch>
      </BrowserRouter>
    </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.UserReducer
  }
}

export default connect(mapStateToProps, null)(App);

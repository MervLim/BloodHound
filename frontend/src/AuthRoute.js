import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
const isAuthenticated = (props) => props.user.isLoggedIn;

const LOGIN_URL = '/'

const AuthRoute = ({component, ...props}) => {

  const isPrivate = props.private;

  if (isAuthenticated(props)) {
    //User is Authenticated
    return <Route { ...props } component={ component } />;
  }
  else {
    //User is not Authenticated
    if (isPrivate === true) {
      //If the route is private the user is redirected to the app's public root.
      return <Redirect to={ LOGIN_URL } />;
    }
    else {
      //If the route is public, the user may proceed.
      return <Route { ...props } component={ component } />;
    }
  }
};

AuthRoute.propTypes = {
  component: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.func
  ])
};
const mapStateToProps = (state) => {
  return {
    user: state.UserReducer
  }
}

export default connect(mapStateToProps, null)(AuthRoute , isAuthenticated);

import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { localLogin } from '../../actions/userAction';

// import css
import './login.css';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      email: "",
      password: ""
    }
  }
  onChange = (e) => {
    let state = this.state;
    let key = e.target.name;
    let value = e.target.value;

    state[key] = value;
    console.log("Login State: "  + state);
    this.setState(state);
  }

  localLogin = (e) => {
    this.props.loginUser(this.state,this.props.history)
     console.log("click");
     console.log(this.state);

  }

  enterKeyPress = (e) => {
    if(e.charCode==13){
       this.props.loginUser(this.state);
    }
  }


  render() {
    return (
      <div className="container">
      <header id='navBar'><p><span>Blood</span>Hound - Your portfolio at a glance</p>
      </header>
        <div className='login-form'>
          <h1 className='pull-center'>Login Here!</h1><br />
           <p>{this.props.username}</p>
          <input type="email" name="email" id="email" className='login-field' placeholder="Email Address" onChange={this.onChange} />
          <input type="password" name="password" id="password" className='login-field' placeholder="Password" onChange={this.onChange} onKeyPress={this.enterKeyPress}/>

           <button className="button-login" onClick={this.localLogin}> Log in </button>
           <p class="text--center">Not a member?</p>
           <Link to='/signup'><button className="button-login"  onClick={this.onChange}>Sign Up</button></Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    user : state.UserReducer
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
     loginUser: (user, history) => {dispatch(localLogin(user, history));}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(login);

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { localSignup } from '../../actions/userAction';

// import css
import './signup.css';

class signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        email: "",
        password: ""
      },
      repassword:""
    }
  }

  onChange = (e) => {
    let userState = this.state.user;
    let key = e.target.name;
    let value = e.target.value;
    userState[key] = value;
    this.setState(userState);
    console.log(userState);
  }


  localSignup = (e) => {
    console.log(this.state.user);
    if (this.state.username == "" || this.state.email == "" || this.state.password == "" || this.state.rePassword == "") {

      e.preventDefault();
    } else if(this.state.password == this.state.repassword){
        this.props.Signup(this.state.user);
    }
  }

  enterKeyPress = (e) => {
    if(e.charCode==13){
      console.log(this.state.user);
      if (this.state.username == "" || this.state.email == "" || this.state.password == "" || this.state.rePassword == "") {

        e.preventDefault();
      } else if(this.state.password == this.state.repassword){
          this.props.Signup(this.state.user);
      }
    }
  }


  render() {
    return (
      <div className="container">
      <header id='navBar'><p><span>Blood</span>Hound - Your portfolio at a glance</p>
      </header>
        <div className='signup-form'>
        <h1 className='pull-center'>Sign Up Here!</h1><br />
          <input type="text" name="username" className='signup-field' id="username" placeholder="Name" onChange={this.onChange}/>
          <input type="email" name="email" className='signup-field' id="email" placeholder="Email Address" onChange={this.onChange}/>
          <input type="password" name="password" className='signup-field' id="password" placeholder="Password" onChange={this.onChange}/>
          <input type="password" name="repassword" className='signup-field'id="re-password" placeholder="Re-Enter Password" onChange={this.onChange} onKeyPress={this.enterKeyPress}/>
          <Link to='/'><button className="signup-btn" onClick={this.localSignup}>Sign up</button></Link>

          <Link to='/'><button className="signup-btn" onClick={this.onChange}>Back</button></Link>


        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
     user: state.UserReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    Signup: (user,history) => {dispatch(localSignup(user,history));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(signup);

import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Search from '../search/search';
import { connect } from 'react-redux';
import Stockview from '../stockview/stockview';
import './dashboard.css'


export class dashboard extends Component {
  constructor(props) {
    super(props);
  }



  execLogout(){
  window.location.href = "/"
  }
  render() {
    console.log('you are  in dashoard', this.props)
    return (
      <div>
      <header id='header'><p>Bloodhound - Track your portfolio at ease</p>
      </header>
      <button className="logOut" onClick={this.execLogout}>LOGOUT</button>

      <Search />
      <div className='dashboard'>
      <p>{this.props.username}</p>
      <Stockview />
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



export default connect(mapStateToProps, null)(dashboard);

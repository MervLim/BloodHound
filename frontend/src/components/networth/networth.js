import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import { connect } from 'react-redux';
import uuid from 'uuid';


export class networth extends Component {
  constructor(props) {
    super(props);
  }

renderNetworth(){
  let userPreference = this.props.user.user.preference;
  console.log(userPreference);
  if (userPreference.length = 0) {
    return
  }   else {

    }
}



  render() {
    return (<div>{this.renderNetworth()}</div>);
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.UserReducer

  };
}

export default connect(mapStateToProps, null)(networth);

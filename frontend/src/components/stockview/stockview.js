import React, {Component} from 'react';
import *  as storeDashboard from '../../actions/searchActions';
import { connect } from 'react-redux';
import LineChart from '../chart/lineChart';
import DoughnutChart from '../chart/doughnutChart';
import NewsFeed from '../newsfeed/newsfeed';
import Networth from '../networth/networth';
import './stockview.css';
import {Bar, Line} from 'react-chartjs-2';
import moment from 'moment';
import uuid from 'uuid';
import axios from 'axios';



export class stockview extends Component {
  constructor(props) {
    super(props);

    // console.log(this.props.result);
  }




  render() {
    return (
      <div className='stockView'>
        <div className='title'><p>News</p>
        <div id='newsFeed'><NewsFeed />
        </div></div>
        <div><LineChart /></div>
        <div id='doughnutChart'><DoughnutChart /></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    result: state.JSONresult.result,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addToDashBoard: (array) => { dispatch(storeDashboard(array)); },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(stockview);

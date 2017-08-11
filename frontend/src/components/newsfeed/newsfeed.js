import React, {Component} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {Doughnut} from 'react-chartjs-2';
import EntryPriceModal from '../modal/entryPriceModal';
import uuid from 'uuid';
import './newsfeed.css'



export class newsfeed extends Component {
  constructor(props) {
    super(props);
  }


  renderNews(){
    if (this.props.newsResult.length <= 0) {
      return(
        <div></div>
      )
    } else {

      return this.props.newsResult.map((item) => {
        return item[0].data.map((item) => {

          return (
            <div key={uuid.v4()} className='newsFeedBorder'>
              <a href = {item.url}>{item.title}</a>
              <p>{item.summary}</p>
            </div>

          )
        });
      })
    }


  }

  render() {
    return (<div className='newsFeed'>{this.renderNews()}</div>);
  }
}
const mapStateToProps = (state) => {
  return{
    newsResult: state.JSONresult.news
  };
}
export default connect(mapStateToProps, null)(newsfeed);

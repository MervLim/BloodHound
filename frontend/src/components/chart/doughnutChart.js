import React, {Component} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {Doughnut} from 'react-chartjs-2';
import EntryPriceModal from '../modal/entryPriceModal';
import uuid from 'uuid';
import './doughnutChart.css';
import {updateEntryPrice, updateUserPreference} from '../../actions/searchActions';



export class doughnutChart extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      entryPrice: 0,
      volume: 0,
      totalPrice:0
    })

  }



handleEntryPrice = (e) => {
  this.state.entryPrice = e.target.value;
  console.log('e price ' + this.state.entryPrice);
}

handleVolume = (e) => {
  this.state.volume = e.target.value;
  console.log('vol ' + this.state.volume);

}

onClick = (e) => {
  let stock = this.props.result;
  let symbol = e.target.name;


  let filteredStock = stock.filter((item)=> {
      const itemSymbol = item['Meta Data']['2. Symbol'];
      return symbol === itemSymbol;
  })
  console.log('filteredStock:', filteredStock[0]['Meta Data']['2. Symbol']);
  const totalValue = this.state.volume * this.state.entryPrice;
  Object.defineProperty(filteredStock[0], "stockSymbol", {
    value: symbol,
    writable: true,
    enumerable: true,
    configurable: true
});
  Object.defineProperty(filteredStock[0], "stockTotalPrice", {
    value: totalValue,
    writable: true,
    enumerable: true,
    configurable: true
});

Object.defineProperty(filteredStock[0], "stockVolume", {
    value: this.state.volume,
    writable: true,
    enumerable: true,
    configurable: true
});
  Object.defineProperty(filteredStock[0], "entryPrice", {
    value: this.state.entryPrice,
    writable: true,
    enumerable: true,
    configurable: true
});
  console.log(filteredStock);
  console.log(this.props.user.user._id)
  this.props.updateEntryPrice(filteredStock, this.props.user.user._id);
}


  renderStock(){
    //Set Date and Time
    let today = new Date();
    const dd = today.getDate()-1;
    const dd2 = today.getDate();
    const mm = today.getMonth()+1; //January is 0!
    const yyyy = today.getFullYear();
    const dateCombine = yyyy+'-'+mm+'-'+dd;
    const dateCombine2 = yyyy+'-'+mm+'-'+dd2;
    let todayFormat =  moment(dateCombine).format('YYYY-MM-DD');
    let todayFormat2 =  moment(dateCombine2).format('YYYY-MM-DD');
    const hours = today.getHours();
    const mins = today.getMinutes();
    const currentTime = String(hours) + String(mins);
    const currentTimeTwoFourFormat = String(hours - 12) + ':' + String(mins);
    const intCurrentTime = parseInt(currentTime);
/*
CHECK FOR MARKET OPENING
*/
    let stock = this.props.result;
    if(typeof(stock) == "undefined") {
      return
    } else if (typeof(stock) !== "undefined"){
    //Display Doughnut Chart  If Market is Closed.
    return stock.map((item)=>{
    let chartData = {
         title: item['Meta Data']['2. Symbol'],
         id: uuid.v4(),
         labels: ["Current Price", "Entry Price"],
         datasets: [{
                data:[
                   (item['Time Series (30min)']['2017-08-02' + ' 16:00:00']['2. high']),
                   item.entryPrice

                ],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
         }]
      }
      return (
        <div key={chartData.id} className='doughnutChart'>
          <EntryPriceModal symbol={chartData.title} handleEntryPrice={this.handleEntryPrice} handleVolume={this.handleVolume} onClick={this.onClick} />
          {chartData.title}
          <Doughnut data={chartData}
                    width={120}
                    height={120}
                    options={{maintainAspectRatio: false}} />
        </div>
      )
    })
    } else {
      return stock.map((item)=>{
        item = item[0];
      let chartData={
          title: item['Meta Data']['2. Symbol'],
          id: uuid.v4(),
          labels: ["High", "Low"],
           datasets: [{
                  data:[
                     item['Time Series (1min)'][todayFormat + ' 16:00:00']['1. open'],
                     item['Time Series (1min)'][todayFormat  + ' 16:00:00']['3. low']
                  ],
                  backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
                  ],
                  hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
                  ]
           }]
        }
        return (
          <div key={chartData.id} className='doughnutChart'>
            <EntryPriceModal handleEntryPrice={this.handleEntryPrice} handleVolume={this.handleVolume} onClick={this.onClick} />
            {chartData.title}
            <Doughnut data={chartData}
              width={120}
              height={120}
              options={{maintainAspectRatio: false}}/>
          </div>
        )
      })
    }
    }
  render() {
    return (<div>{this.renderStock()}</div>);
  }
}
const mapStateToProps = (state) => {
  return{
    result: state.JSONresult.result,
    updateChart: state.JSONresult.stock,
    user: state.UserReducer

  };
}

const mapDispatchToProps=(dispatch)=>{
  return{
     updateEntryPrice: (stock, id) => {dispatch(updateUserPreference(stock, id));}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(doughnutChart);

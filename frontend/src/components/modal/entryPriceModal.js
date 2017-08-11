import React, {Component} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import './entryPriceModal.css';



export class entryPriceModal extends Component {
  constructor(props) {
    super(props);
    this.state={
      showModal: false
    };
  }

   handleOpenModal = () => {
     this.setState({showModal: true});
  }

  handleCloseModal = () => {
    this.setState({showModal: false});
  }




	render () {
	    return (
	      <div>
	        <button onClick={this.handleOpenModal}>Add Price & Volume</button>
	        <Modal isOpen={this.state.showModal} className="Modal" contentLabel='Price modal'>
                <form>
                <input className='input' type='number' onChange={this.props.handleEntryPrice} type= "text" placeholder="Enter Your Entry Price"/>
                <input className='input' type='number' onChange={this.props.handleVolume} type= "text" placeholder="Enter Your Stock Volume"/>
                </form>
                <button onClick={this.props.onClick} name={this.props.symbol}>Submit Entry</button>
                <button onClick={this.handleCloseModal}>Close</button>

	        </Modal>
	      </div>
	    );
	  }
	}


export default entryPriceModal;

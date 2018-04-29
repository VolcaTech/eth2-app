import React, { Component } from 'react';
import Phone, { formatPhoneNumber, parsePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import rrui from 'react-phone-number-input/rrui.css';
import rpni from 'react-phone-number-input/style.css';
import { parse, format, asYouType } from 'libphonenumber-js';
import Modal from "./modal";
import web3Service from "../../../services/web3Service";
import * as eth2phoneService from "../../../services/eth2phone";
// import History from "./History";
const ReactTelInput = require('react-telephone-input');


export default class Form extends Component {
	constructor(props) {
		console.log("constructor");
		super(props);
		this.state = {
		    phone: '1',
		    phoneCode: '',
		    amount: '',
		    amountToPay: '',
		    code: '',
		    confirmPressed: false,
		    showModal: false,
		    sendingTx: false,
		    isMining: true,
		    error: false,
		    errorMsg: "",
		    phoneIsValid: false,
		    historyUpdateCounter: 0, // counter is updated in order to <History /> to fetch new transfer
		    step: 0,
		    hash: ""
		};
	}
    
    _changeAmount(amount) {
	const { commission, amountWithCommission } = eth2phoneService.getAmountWithCommission(amount);
	this.setState({amount, amountToPay: amountWithCommission});
    }
    
    closeModal() {
	this.setState({ showModal: false });
    }

    showModal() {
	this.setState({ showModal: true });
    }
    
    async handleSubmit() {
	this.setState({ errorMsg: "", error: false });
	const component = this;
	let transferId;
	if (this.state.phoneIsValid === false) {
	    this.setState({ errorMsg: "Invalid phone number", error: true });
	    return null;
	}
	if (this.state.amount.length === 0) {
	    this.setState({ errorMsg: "Wrong amount", error: true });
	    return null;
	}
	
	component.setState({
	    confirmPressed: true,
	    showModal: true,
	    sendingTx: true,
	    errorMsg: ""
	});
	
	try {
	    // send to server 
	    const { txHash, secretCode } = await eth2phoneService.sendTransfer(
		this.state.phoneCode,
		this.state.phone,
		this.state.amountToPay
	    );

	    // tx is pending (not mined yet)
	    console.log({txHash, secretCode});
	    component.setState({
		step: 1,
		hash: txHash,
		code: secretCode
	    });
	    const txReceipt = await web3Service.getTransactionReceiptMined(txHash);    
	    
	    // tx is mined
	    component.setState({
		sendingTx: false,
		step: 2,
		historyUpdateCounter: 1		
	    });		
	} catch(err) {
	    console.log({ err });
	    component.setState({
		sendingTx: false,
		error: true,
		errorMsg: (err.msg || err)
	    });
	};
    };

    render() {
	const component = this;
	const form = (
	    <div>
	      <div>
		<label>
		  Receiver's Phone number
  		</label>
		<div className="input-container">
		  <div style={{ width: "90%", float: "left" }}>
		    <Phone
		       value={component.state.phone} onChange={phone => {
			   const phoneIsValid = isValidPhoneNumber(phone);
			   const formatter = new asYouType();
			   formatter.input(phone);
			   this.setState({ phoneCode: formatter.country_phone_code, phone, phoneIsValid });
		      }} /></div><div style={{ width: "10%", float: "right" }}>{this.state.phoneIsValid ? <div className="green-tick" >&#10003;</div> : ""}</div></div>
	      </div>
	      <div className="m-t">
		<div className="row">
		  <div className="col-sm-6"><label>
		      Amount to send, eth.
		    </label>
		    <div className="input-container">
		      <div style={{ width: "80%", float: "left" }}>
			<input className="form-control" type="text" value={component.state.amount} onChange={(event) => component._changeAmount(event.target.value)} />
		      </div><div style={{ width: "20%", float: "right" }}>{this.state.amount > 0 ?  <div className="green-tick" >&#10003;</div> : ""}</div></div></div>

		  <div className="col-sm-6"><label>
		      Amount to pay*, eth.
		    </label>				<div className="input-container">
		      <div style={{ width: "80%", float: "left" }}>
			<input className="form-control" style={{background: "lightslategrey"}} value={this.state.amount > 0 ? parseFloat(this.state.amountToPay) : ""} disabled type="text" onChange={(event) => component.setState({ amount: event.target.value })} />
		      </div><p style={{ width: "80%" }}>*The amount to be withdrawn including
			<strong> fixed commission of 0.01184 ether. </strong> We charge it to cover gas cost for reciever, the SMS provider expense and server maintenance, plus a two cheap meals a day for our small team to keep going.</p></div></div></div>
	      </div>
	      <a className="btn btn-md btn-accent" onClick={() => component.handleSubmit()}>Send</a>
	      <span style={{ color: "red" }} > {component.state.errorMsg}</span>
	      <div className="m-t">
	      </div>
	    </div>
	);
	const txDetails = (
	    <div>
	      <div>
		<label>
		  Phone number
  		</label>
		<p className="form-control"> {component.state.phone} </p>
	      </div>
	      <div className="m-t">
		<label>
		  Amount
		</label>
		<p className="form-control"> {component.state.amount} </p>
	      </div>
	      <div className="m-t">
		<a className="btn btn-md btn-accent" onClick={() => component.showModal()}>Show code</a>
	      </div>
	    </div>

	);

	return (
	    <div className="col-sm-12">

	      {!this.state.confirmPressed ? form : txDetails}

	      <Modal sendingTx={component.state.sendingTx}
		     code={component.state.code}
		     phone={component.state.phone}
		     showModal={component.state.showModal}
		     error={component.state.error}
		     errorMsg={component.state.errorMsg}
		     step={component.state.step}
		     hash={component.state.hash}
		     closeModal={() => component.closeModal()} />

	    </div>


	);


    }
}


// <History updateCounter={this.state.historyUpdateCounter} />

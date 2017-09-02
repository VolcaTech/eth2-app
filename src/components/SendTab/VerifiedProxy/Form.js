import React, { Component } from 'react';
//import VerificationCode from "./VerificationCode";
import Modal from "./modal";

import serverApi from "../../../utils/quid-server-api";
import web3Api from "../../../utils/web3-common-api";
import sha3 from 'solidity-sha3';
import ksHelper from '../../../utils/keystoreHelper';
import verifiedProxyContractApi from "../../..//utils/verified-proxy-contract-api";
import History from "./History";

export default class Form extends Component {
    
    constructor(props) {
	console.log("constructor");
	super(props);
	this.state = {
	    phone: '',
	    amount: '',
	    code: '',
	    confirmPressed: false,
	    showModal: false,
	    sendingTx: false,
	    error: false,
	    errorMsg: "",
	    historyUpdateCounter: 0 // counter is updated in order to <History /> to fetch new transfer
	};
    }

    generateCode() {
	const random = Math.random().toString(32).slice(5).toUpperCase();
	return random;
    }
    
    generateWallet(secretCode) {
	const {address, keystoreData } = ksHelper.create(secretCode);
	return {address, ksData: keystoreData};
    }        

    closeModal() {
	this.setState({showModal: false });
    }
    showModal() {
	this.setState({showModal: true });
    }

    
    handleSubmit() {
	const component = this;
	if (this.state.phone.length > 0 && this.state.amount.length > 0) {
	    const secretCode = this.generateCode();
	    const {address, ksData} = this.generateWallet(secretCode);
	    component.setState({
	    	confirmPressed : true,
	    	code: secretCode,
		showModal: true,
		sendingTx: true,
		errorMsg: ""
	    });
	    verifiedProxyContractApi.sendTransfer(address, this.state.amount, this.state.phone, secretCode)
		.then(function(_from) {
		    // secret code is never pushed to server
		    // only hashed code
	    	    const hashedCode = sha3(component.state.phone, secretCode);
		    console.log("params send to server: ", hashedCode);
		    const from = web3Api.getAddress();
	    	    return serverApi.sendTransfer(component.state.phone, component.state.amount, ksData, address, hashedCode, from);
		}).then((result) => {
		    console.log({result});
		    let error = false;
		    let errorMsg = "";		    
		    if (!result || !result.success) {
			error = true;
			errorMsg = result.errorMsg || "Server error!";			
		    }
	    	    component.setState({
			sendingTx: false,
			error,
			errorMsg,
			historyUpdateCounter: 1
	    	    });
		}).catch((err) => {
		    console.log({err});
	    	    component.setState({
			sendingTx: false,
			error: true,
			errorMsg: err
	    	    });		    
		});
	}
    }

    render() {
	const component = this;


	const form = (
		<div>
	<div>
	    <label>
		Phone number
  	    </label>
	    <input className="form-control" type="text" value={component.state.phone} onChange={(event) => component.setState({ phone: event.target.value })} />		
	</div>
	<div className="m-t">
		<label>
		Amount
	    </label>
	    <input className="form-control" type="text" value={component.state.amount} onChange={(event) => component.setState({ amount: event.target.value })} />		
		</div>
		<div  className="m-t">		
		<a className="btn btn-md btn-accent" onClick={() => component.handleSubmit()}>Send</a>

		</div>
		</div>
	)
	const txDetails = (
		<div>
		<div>
		<label>
		Phone number
  	    </label>
	    <p className="form-control" type="text"> {component.state.phone } </p> 
	</div>
	<div className="m-t">
	    <label>
		Amount
	    </label>
	    <p className="form-control" type="text"> {component.state.amount } </p> 
		</div>
		<div  className="m-t">
		<a className="btn btn-md btn-accent" onClick={() => component.showModal()}>Show code</a>		
	     </div>
	</div>
		    
		)
	
	return (
    <div className="col-sm-12">

		{!this.state.confirmPressed ?  form : txDetails }


                <History updateCounter={this.state.historyUpdateCounter} />	    
		<Modal sendingTx={component.state.sendingTx}
	    code={component.state.code}
	    showModal={component.state.showModal}
	    error={component.state.error}
	    errorMsg={component.state.errorMsg}
	    closeModal={() => component.closeModal()}  /> 

            
    </div>


	);


    }
}


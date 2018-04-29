import React, { Component } from 'react';
import web3Service from "../../../services/web3Service";
import PhoneForm from './PhoneForm';
import TxProgress from './ReceiveTxProgress';
import * as eth2phoneService from "../../../services/eth2phone";


export default class ConfirmForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
		    smsCode: "",
		    isFetching: false,
		    step: 0,
		    txId: "",
		    txAmount: 0
		};
	}


	submit() {
	    const component = this;
	    console.log(this.state);
	    this.setState({ isFetching: true, step: 1 });
	    eth2phoneService.verifyPhoneAndWithdraw(this.props.phoneCode,
						this.props.phone,
						this.props.code,
						this.state.smsCode,
						this.props.to)
		.then(function (result) {
		    console.log({ result });
		    // tx is pending (not mined yet)
		    component.setState({ step: 2, txId: result.pendingTxHash, txAmount : result.amount});
		    return web3Service.getTransactionReceiptMined(result.pendingTxHash);
		}).then((txReceipt) => {
		    console.log("Tx mined!");
		    component.setState({ isFetching: false, step: 3 });
		}).catch(function (err) {
		    console.log({ err });
		    component.setState({
			error: (err.message || err.errorMessage || "Server error!"),
			isFetching: false,
			step: 0
		    });
		});
	}



	render() {
	    const component = this;
	    return (
		<div>
		  <div>
		    {this.state.step > 0 ? <div className="modal-body" style={{ marginBottom: "50px" }}>
			  <TxProgress step={this.state.step} txId={this.state.txId} address={this.props.to} txAmount={this.state.txAmount}/></div> : <div>
			  <input className="form-control" type="text" onChange={(event) => this.setState({ smsCode: event.target.value })} placeholder="Enter SMS code you've received" />
		    </div>}
		  </div>
		  <div>
		    {this.state.step === 0 ? <a className="btn btn-md btn-accent" onClick={() => component.submit()}>Send</a> : ""}
		    <span style={{ color: "red" }} > {component.state.error}</span>
		  </div>
		</div>
	    );
	}
}

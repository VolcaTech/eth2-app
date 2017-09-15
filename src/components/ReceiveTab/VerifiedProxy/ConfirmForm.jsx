import React, { Component } from 'react';
import serverApi from "../../../utils/quid-server-api";
import web3Api from "../../../utils/web3-common-api";

import ksHelper from '../../../utils/keystoreHelper';
import sha3 from 'solidity-sha3';
const util = require("ethereumjs-util");
import PhoneForm from './PhoneForm';
import TxProgress from './ReceiveTxProgress';
const Web3Utils = require('web3-utils');
const SIGNATURE_PREFIX = "\x19Ethereum Signed Message:\n32";

export default class ConfirmForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
		    smsCode: "",
		    isFetching: false,
		    step: 0,
		    txId: this.props.txId,
		    txAmount: 0
		};
	}


	submit() {
		const component = this;
		console.log(this.state);
		this.setState({ isFetching: true });
		serverApi.verifyPhone(this.props.transferId, this.props.phone, this.state.smsCode)
			.then(function (result) {
			    console.log({ result });
			    if (!result || !result.success) {
				throw new Error((result.errorMessage || "Server error!"));
			    }
			    
			    console.log(result);
			    component.setState({ step: 1 });
			    const verificationHash = Web3Utils.soliditySha3(SIGNATURE_PREFIX, { type: 'address', value: component.props.to });
			    
			    const signature = ksHelper.signTx(result.transfer.verificationKeystoreData, component.props.code, verificationHash);
			    console.log("signature: ", signature);

			    const v = signature.v;
			    const r = '0x' + signature.r.toString("hex");
			    const s = '0x' + signature.s.toString("hex");
			    
			    return serverApi.confirmTx(
				component.props.transferId,
				component.props.phone,
				component.state.smsCode,
				component.props.to, v, r, s);
			}).then(function (result) {
			    console.log({ result });
			    component.props.onSuccess(result.pendingTxHash);
			    // tx is pending (not mined yet)
			    component.setState({ step: 2, txId: result.pendingTxHash, txAmount : result.amount});
			    return web3Api.getTransactionReceiptMined(result.pendingTxHash);
			}).then((txReceipt) => {
				component.setState({ step: 3 });
				console.log("Tx mined!");
				component.setState({ isFetching: false });
			}).catch(function (err) {
				console.log({ err });
				component.setState({
					error: (err.message || err.errorMessage || "Server error!"),
					isFetching: false
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

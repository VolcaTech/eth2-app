import React, { Component } from 'react';
import web3Api from "../../../utils/web3-common-api";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import AddressRadioSelect from './AddressRadioSelect';
import ksHelper from '../../../utils/keystoreHelper';

const fileDownload = require('react-file-download');

//import ksHelper from'../../../utils/keystoreHelper';
//const util = require("ethereumjs-util");


export default class AddressForm extends Component {
	constructor(props) {
	    super(props);
	    let selectedOption;
	    
	    this.state = {
		selectedOption: 0,
		address: "",
		error: "",
		selectedOption,
		keystoreData: ""
	    };
	}

    componentWillReceiveProps(newProps) {
	if (newProps.web3Connected !== this.props.web3Connected) {
	    this._checkWeb3IsConnected(newProps);
	}
    }
    
    componentDidMount() {
	this._checkWeb3IsConnected(this.props);
    }

    _checkWeb3IsConnected(props) {
	let selectedOption;
	if (props.web3Connected) {
	    selectedOption = 0;
	} else {
	    selectedOption = 2;
	}
	this._initAddress(selectedOption);
    }
    
    _initAddress(option) {
	let address;
	if (option === 0) {
	    address = web3Api.getAddress();
	} else {
	    address = "";
	}
	this.setState({ address, selectedOption: option });
    }
    
    submit() {
		if (this.state.address.length === 42) {
			this.props.onSuccess(this.state.address);
		} else {
			this.setState({ error: `Address has wrong length: ${this.state.address.length}. Should be 42 instead.` });
		};
	}

	onAddressTypeChange(selectedOption) {
		this._initAddress(selectedOption);
	}

	generateWallet() {
		if (!this.state.password) {
			this.setState({ error: "Provide password for your new wallet" });
		} else {
			const { address, keystoreData } = ksHelper.create(this.state.password);
			this.setState({ address, keystoreData });
		}
	}

	downloadKeystoreData() {
		if (!this.state.keystoreData) {
			this.setState({ error: "Generate wallet first!" });
		} else {
			fileDownload(this.state.keystoreData, `keystore-${Date.now()}.json`);
		}
	}


	render() {
		const connectedAddress = (
			<div>
				<label> Address </label>
				<p className="form-control crop-text">
					{this.state.address}
				</p>
			</div>
		);

		const addressInput = (
			<div>
				<label> Address </label>
				<input placeholder="0x000.." className="form-control crop-text" type="text" onChange={(event) => this.setState({ address: event.target.value })} />

			</div>

		);

		const generateWallet = (
			<div className="m--t-mg m--b">
				<div>
					<label> Password</label>
					<div className="row">
						<div className="col-sm-6">
							<input placeholder="Password" className="form-control crop-text" type="text" onChange={(event) => this.setState({ password: event.target.value })} />
						</div>
						<div className="col-sm-6">
							<a className="btn btn-md btn-default" onClick={() => this.generateWallet()}> Generate </a>
						</div>
					</div>
				</div>
				<div>
					<label> Your wallet address: </label>
					<div className="row">
						<div className="col-sm-6">
							<p className="form-control crop-text">
								{this.state.address}
							</p>
						</div>

						<div className="col-sm-6">
							<label>Please:<br /><br/>
								1. Save your password and wallet address.<br/>
		2. Save your keystore as text or as file (press «download keystore data» button).</label>
						</div>
					</div>


				</div>
				<div>
					<label> Your kestore data: </label>
					<div className="row">
					<div className="col-sm-6">
					<div className="form-control crop-text keystore-field" type="textarea">
						{this.state.keystoreData}
					</div>
					<a className="btn btn-md btn-default" onClick={() => this.downloadKeystoreData()}> Download Keystore </a>
					</div>
					<div className="col-sm-6"><label>Wallet address can be shared with people to receive assetes.<br/><br/>
						Password and your keystore data should be stored securely and not
shared with untrusted third parties.<br/><br/>
We recommend using <a href="https://www.myetherwallet.com/#send-transaction">MyEtherWallet</a> to import your wallet (keystore data file and password are required) in order to send tranactions to other addresses.<br/><br/>
Stay safe and enjoy the ride!</label>
						</div>
				</div>
</div>

			</div>
		);


		return (
			<div>

				<AddressRadioSelect
					disabled={!web3Api.isConnected()}
					onAddressTypeChange={(v) => this.onAddressTypeChange(v)}
					selectedOption={this.state.selectedOption} />
				<div>
					{(this.state.selectedOption === 0) ? connectedAddress :
						((this.state.selectedOption === 1) ? addressInput :
							generateWallet)
					}

				</div>
				<div className="m-t">
					<a className="btn btn-md btn-accent" onClick={() => this.submit()}> Continue </a>
					<span style={{ color: "red" }} > {this.state.error}</span>
				</div>
			</div>
		);
	}
}

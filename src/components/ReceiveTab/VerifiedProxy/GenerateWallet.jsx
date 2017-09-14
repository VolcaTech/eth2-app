import React, { Component } from 'react';
import web3Api from "../../../utils/web3-common-api";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import AddressRadioSelect from './AddressRadioSelect';
import ksHelper from '../../../utils/keystoreHelper';

const fileDownload = require('react-file-download');

const Guidelines = () => (
    <div>
      <label>Please:<br /><br/>
	1. Save your password and wallet address.<br/>
	2. Save your keystore as text or as file (press «download keystore data» button).</label>
      
      <label>Wallet address can be shared with people to receive assetes.<br/><br/>
	Password and your keystore data should be stored securely and not
	shared with untrusted third parties.<br/><br/>
	We recommend using <a href="https://www.myetherwallet.com/#send-transaction">MyEtherWallet</a> to import your wallet (keystore data file and password are required) in order to send tranactions to other addresses.<br/><br/>
	Stay safe and enjoy the ride!</label>
    </div>
)


export default class GenerateWallet extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
		address: "",
		error: "",
		keystoreData: ""
	    };
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

		return (
		    <div className="m--t-mg m--b">
		      <div>
			<label> Password </label>
			<div className="row">
			  <div className="col-sm-6">
			    <input placeholder="Password" className="form-control crop-text" type="text" onChange={(event) => this.setState({ password: event.target.value })} />
			  </div>
			  <div className="col-sm-6">
			    <a className="btn btn-md btn-default" onClick={() => this.generateWallet()}> Generate Wallet </a>
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
			  <div className="col-sm-6">
			  </div>
			</div>
		      </div>

		    </div>
		);

	}
}

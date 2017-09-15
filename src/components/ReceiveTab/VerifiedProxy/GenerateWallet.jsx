import React, { Component } from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
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


const AddressWithKeystore = ({address, keystore}) => {
    if (address.length !== 42) {return null;}
    const downloadKeystoreData = () => {
	fileDownload(keystore, `keystore-${Date.now()}-${address}.json`);
    };
    
    return (
	<div>
	  <label> Your wallet address: </label>
	  <p className="form-control crop-text"> {address} </p>
	  <label> Your kestore data: </label>
	  <div className="form-control crop-text keystore-field" type="textarea"> {keystore}</div>
	  <div className="gold"> WITHOUT KEYSTORE DATA YOU WILL LOOSE ACCESS TO THE WALLET! </div>
	  <a className="btn btn-md btn-default" onClick={() => downloadKeystoreData()}> Download Keystore Data </a>
	</div>
    );
}

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
	} else if (this.state.password.length < 8) {
	    this.setState({ error: "Password should be at least 8 symbols" });
	} else {
	    const { address, keystoreData } = ksHelper.create(this.state.password);
	    this.setState({ address, keystoreData, error: "" });
	    this.props.onSubmit(address);
	}
	
    }




    render() {
	return (
	    <div className="m--t-mg m--b">
	      <div>
		<label> Password </label>
		<div className="row">
		  <div className="col-sm-6">
		    <input placeholder="Password" className="form-control crop-text" type="text" onChange={(event) => this.setState({ error: "", password: event.target.value })} />
		    <a className="btn btn-md btn-default" onClick={() => this.generateWallet()}> Generate Wallet </a>
		    <span style={{color: "red"}}> {this.state.error} </span>
		    <AddressWithKeystore address={this.state.address} keystore={this.state.keystoreData}/> 
		  </div>
		  <div className="col-sm-6">
		    <Guidelines/>
		  </div>

		</div>
	      </div>


	    </div>
	    
	);

    }
}

import React, { Component } from 'react';
import web3Service from "../../../services/web3Service";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import AddressRadioSelect from './AddressRadioSelect';
import GenerateWallet from './GenerateWallet';


export default class AddressForm extends Component {
    constructor(props) {
	super(props);
	let selectedOption;
	this.state = {
	    selectedOption: 0,
	    address: "",
	    error: "",
	    selectedOption
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
	    address = web3Service.getAddress();
	} else {
	    address = "";
	}
	this.setState({ address, selectedOption: option, error: "" });
    }
    
    submit() {
	if (this.state.address.length === 42) {
	    this.props.onSuccess(this.state.address);
	} else if(this.state.selectedOption === 2) {
	    this.setState({ error: `Generate Wallet first` });
	} else {
	    this.setState({ error: `Address has wrong length: ${this.state.address.length}. Should be 42 instead.` });
	};
    }

    
    onAddressTypeChange(selectedOption) {
	this._initAddress(selectedOption);
    }

    
    onGeneratedWallet(address) {
	this.setState({ address });
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

	return (
	    <div>

	      <AddressRadioSelect
		 disabled={!web3Service.isConnected()}
		 onAddressTypeChange={(v) => this.onAddressTypeChange(v)}
		selectedOption={this.state.selectedOption} />
		<div>
		  {(this.state.selectedOption === 0) ? connectedAddress :
		      ((this.state.selectedOption === 1) ? addressInput :
		       <GenerateWallet onSubmit={(address) => this.onGeneratedWallet(address)}/>)
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

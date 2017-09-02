import React, { Component } from 'react';
import web3Api from "../../../utils/web3-common-api";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import AddressRadioSelect from './AddressRadioSelect';
import ksHelper from'../../../utils/keystoreHelper';
//import ksHelper from'../../../utils/keystoreHelper';
//const util = require("ethereumjs-util");


export default class AddressForm extends Component {
    constructor(props) {
        super(props);
	let selectedOption;
	if (web3Api.isConnected()) {
	    selectedOption = 0;
	} else {
	    selectedOption = 2;
	}
		
        this.state = {
            address: "",
	    error: "",
	    connected: false,
	    selectedOption,
	    keystoreData: ""
        };
    }

    componentDidMount() {
	this._initAddress(this.state.selectedOption);
    }

    _initAddress(option) {
	let address;
	if (option === 0) {
	    address = web3Api.getAddress();
	} else {
	    address = "";
	}
	this.setState({address, selectedOption: option });
    }
    
    submit() {
	if (this.state.address.length === 42) {
	    this.props.onSuccess(this.state.address);
	} else {
	    this.setState({error: `Address has wrong length: ${this.state.address.length}. Should be 42 instead.`});
	};
    }

    onAddressTypeChange(selectedOption) {
	this._initAddress(selectedOption);
    }

    generateWallet() {
	if (!this.state.password) {
	    this.setState({error: "Provide password for your new wallet"});
	} else {
	    const {address, keystoreData } =  ksHelper.create(this.state.password);
	    this.setState({address, keystoreData});
	}
    }
    
    
    render() {
	const connectedAddress = (
		<div>
		<label> Address </label>		
		<p className="form-control">
		{ this.state.address }
	    </p>
		</div>
	);

	const addressInput = (
		<div>
		<label> Address </label>			    
		<input placeholder="0x000.." className="form-control" type="text" onChange={(event)=>this.setState({address:event.target.value})} />

		</div>
		
	);

	const generateWallet = (
		<div class="m--t-mg m--b">
		<div>
  	        <label> Password</label>
		<div className="row">
		 <div className="col-sm-6">
                   <input placeholder="Password" className="form-control" type="text" onChange={(event)=>this.setState({password:event.target.value})} />
		</div>
		<div className="col-sm-6">
		   <a className="btn btn-md btn-accent" onClick={()=>this.generateWallet()}> Generate </a>
		</div>
		</div>
		</div>
		<div>
		<label> Address: </label>
		<p className="form-control">
		{ this.state.address }
	    </p>
	  	</div>
		<div>
		<label> Kestore Data: (copy this content to secure location) </label>
		<div>
	 	  { this.state.keystoreData }
	       </div>
	  	  </div>

		
		</div>
	);

	
        return (
		<div>

		<AddressRadioSelect
	    disabled={!web3Api.isConnected()}
	     onAddressTypeChange={(v) => this.onAddressTypeChange(v)}
	     selectedOption={this.state.selectedOption}/>	
		<div>
		{ (this.state.selectedOption === 0) ? connectedAddress :
		  ((this.state.selectedOption === 1) ? addressInput :
		   generateWallet)				  
		} 
		
		</div>
		<div className="m-t">
		<a className="btn btn-md btn-accent" onClick={()=>this.submit()}> Continue </a>
	        <span style={ {color: "red"}} > {this.state.error }</span>
		</div>
            </div>
        );
    }
}

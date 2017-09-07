import React, { Component } from 'react';
import serverApi from "../../../utils/quid-server-api";
import web3Api from "../../../utils/web3-common-api";
import ksHelper from'../../../utils/keystoreHelper';
import sha3 from 'solidity-sha3';
const util = require("ethereumjs-util");

import PhoneForm from './PhoneForm';
import AddressForm from './AddressForm';
import ConfirmForm from './ConfirmForm';

export default class ReceivePhoneTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepId: 0,
            phone: "",
            transferId: "",
	    code: "",
            smsCode: "",
            to: "",
	    txId: ""
        };
    }

    onPhoneSuccess(transferId, phone, code) {
        this.setState({
	    stepId:2,
	    transferId,
	    phone,
	    code: code
	});

    }


    onAddressChosen(address) {
        this.setState({
	    stepId:1,
	    to: address
        });
    }

    
    onConfirmSuccess(txId) {
        this.setState({
	    stepId:3,
	    txId
        });
    };

    goTo(stepId) {
        this.setState({
	    stepId
        });
    };

    

    _stepComponent() {
	const component = this;
	let stepComponent = null;
	switch (this.state.stepId) {
	case 0: 
	    stepComponent = (
		    <AddressForm onSuccess={(address) => component.onAddressChosen(address)}/>
	    );
	    break;
	    
	case 1: 
	    stepComponent = (
		    <PhoneForm
		onSuccess={(transferId, phone, code) => component.onPhoneSuccess(transferId, phone, code)}
                goBack={() => this.goTo(0)}
		    />
	    );
	    break;
	case 2:
	    stepComponent = (
		    <ConfirmForm onSuccess={(txId) => component.onConfirmSuccess(txId) }
		phone={this.state.phone} code={this.state.code} transferId={this.state.transferId} to={this.state.to}
		    />
	    );
	    break;
	case 3:
	    stepComponent = (
		    <div>
		    Transfer has been succesfully completed!
                    <div>
		      Tx Id: {this.state.txId}
		    </div>
		    </div>
	    );
	    break;
	    
	default:
	    stepComponent = (
		    <div>
		      Unknown step
		    </div>
	    );
	}
	return stepComponent;
    }
    
    render() {	
        return (
            <div>
		{ ( this.state.stepId !== 0)  ?
		  <div className="m-b">
			  <br/>
		  <label style={{marginLeft:"-4px"}}>Receiver Address: {this.state.to }</label>
		  </div>: ""
		}
                { this._stepComponent() }
            </div>
        );
    }
}

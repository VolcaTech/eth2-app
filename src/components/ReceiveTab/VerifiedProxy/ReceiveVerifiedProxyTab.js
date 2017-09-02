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
            code: "",
            smsCode: "",
            to: ""
        };
    }

    onPhoneSuccess(phone, code) {
        this.setState({
	    stepId:2,
	    code,
	    phone
        });
    }


    onAddressChosen(address) {
        this.setState({
	    stepId:1,
	    to: address
        });
    }

    
    onConfirmSuccess() {
        this.setState({
	    stepId:3
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
		      onSuccess={(phone, code) => component.onPhoneSuccess(phone, code)}
                goBack={() => this.goTo(0)}
		    />
	    );
	    break;
	case 2:
	    stepComponent = (
		    <ConfirmForm onSuccess={() => component.onConfirmSuccess() }
		phone={this.state.phone} code={this.state.code}
		    />
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
		     Address: {this.state.to } 
		  </div>: ""
		}
                { this._stepComponent() }
            </div>
        );
    }
}

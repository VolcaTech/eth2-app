import React, { Component } from 'react';
import serverApi from "../../../utils/quid-server-api";
import web3Api from "../../../utils/web3-common-api";
import ksHelper from'../../../utils/keystoreHelper';
import sha3 from 'solidity-sha3';
const util = require("ethereumjs-util");

import PhoneForm from './PhoneForm';
import ConfirmForm from './ConfirmForm';

export default class ReceivePhoneTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepId: 1,
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
    
    onConfirmSuccess() {
        this.setState({
	    stepId:3
        });
    };


    _stepComponent() {
	const component = this;
	let stepComponent = null;
	switch (this.state.stepId) {
	case 1: 
	    stepComponent = (
		    <PhoneForm onSuccess={(phone, code) => component.onPhoneSuccess(phone, code)}/>
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
                { this._stepComponent() }
            </div>
        );
    }
}

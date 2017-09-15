import React, { Component } from 'react';
import web3Api from "../../../apis/web3-common-api";

import PhoneForm from './PhoneForm';
import AddressForm from './AddressForm';
import ConfirmForm from './ConfirmForm';


export default class ReceiverProxyTab extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    stepId: 0,
	    phone: this.props.phone === "" ? "1" : this.props.phone,
	    phoneCode: "",
	    code: this.props.code,
	    smsCode: "",
	    to: ""
	};
    }

    onPhoneSuccess(phoneCode, phone, code) {
	this.setState({
	    stepId: 2,
	    phoneCode,
	    phone,
	    code: code
	});

    }

    onAddressChosen(address) {
	this.setState({
	    stepId: 1,
	    to: address
	});
    }


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
		<AddressForm web3Connected={web3Api.isConnected()} onSuccess={(address) => component.onAddressChosen(address)} />
	    );
	    break;

	case 1:
	    stepComponent = (
		<PhoneForm
		   onSuccess={(phoneCode, phone, code) => component.onPhoneSuccess(phoneCode, phone, code)}
		  goBack={() => this.goTo(0)}
		  code={this.state.code} phone={this.state.phone} />
	    );
	    break;
	case 2:
	    stepComponent = (
		<ConfirmForm 
		   phone={this.state.phone}
		   code={this.state.code}
		   phoneCode={this.state.phoneCode}
		   to={this.state.to}
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
	      {(this.state.stepId !== 0) ?
		  <div className="m-b">
			<br />
			    <label style={{ marginLeft: "-4px" }}>Receiver Address: </label><div className="crop-text">{this.state.to}</div>
		      </div> : ""
		  }
		  {this._stepComponent()}
	    </div>
	);
    }
}

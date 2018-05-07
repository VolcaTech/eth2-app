import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { sendTransfer } from '../../actions/transfer';
import { sendSmsToPhone } from '../../services/eth2phone';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
//import PendingTransfer from './PendingTransfer';
import { getQueryParams, getNetworkNameById } from '../../utils';
import ConfirmSmsForm from './ConfirmSmsForm';
import { parse, format, asYouType } from 'libphonenumber-js';
import { isValidPhoneNumber } from 'react-phone-number-input';
const qs = require('querystring');


class Tab extends Component {
    constructor(props) {
        super(props);
	console.log({props});
	//
	//const queryParams = {}
	const queryParams = qs.parse(props.location.search.substring(1));
	console.log({queryParams});

	// parse phone params
	const phone = `+${queryParams.phone}`;
	const phoneIsValid = isValidPhoneNumber(phone);
	const formatter = new asYouType();
	formatter.input(phone);

	this.phoneParams = {
	    phone,
	    phoneCode: formatter.country_phone_code,
	    phoneIsValid
	};

	console.log(this.phoneParams)
	
	this.secretCode = queryParams.code;
	this.networkId = queryParams.chainId || 1;	
	
        this.state = {
            errorMessage: "",
	    step: 'confirm-details'
        };
    }

    async _sendSmsToPhone() {
	try {

	    if (this.networkId && this.networkId !== this.props.networkId) {
		const networkNeeded = getNetworkNameById(this.networkId);
		const currentNetwork = getNetworkNameById(this.props.networkId);
		const msg = `Transfer is for ${networkNeeded} network, but you are on ${currentNetwork} network`;
		throw new Error(msg);
	    }
	    
	    const result = await sendSmsToPhone({
	    	phone: this.phoneParams.phone,
	    	secretCode: this.secretCode,
	    	phoneCode: this.phoneParams.phoneCode
	    });
	    this.setState({step: 'confirm-sms'});
	} catch(err) {
	    this.setState({ errorMessage: err.message });
	}
    }
    
    _onSubmit() {	
	 this._sendSmsToPhone();
    }


    _renderConfirmDetailsForm() {
	return (
	    <div>
	      <div>
		<NumberInput backgroundColor='#f5f5f5' disabled={true} placeholder={this.phoneParams.phone} />
	      </div>
	      <div style={{ height: 28, color: '#ef4234', fontSize: 9, textAlign: 'center', paddingTop: 8 }}>
		{this.state.errorMessage}
	      </div>
	      <div style={{ marginTop: 28 }}>
		<ButtonPrimary handleClick={this._onSubmit.bind(this)} buttonColor={e2pColors.green}>
		  Receive
	      </ButtonPrimary>
	      </div>
	    </div>
	);
    }
    
    render() {
	const props = {
	    ...this.props,
	    secretCode:this.secretCode,
	    phoneCode:this.phoneParams.phoneCode,
	    phone: this.phoneParams.phone
	};
        return (
            <div style={{ alignContent: 'center' }}>
              <div><img src={e2pLogo} style={{ display: 'block', margin: 'auto', marginTop: 17, marginBottom: 28 }} /></div>
	      
	      <div>
		{ this.state.step === 'confirm-details' ?
		    this._renderConfirmDetailsForm() : <ConfirmSmsForm {...props}/> }
	      </div>
	      
            </div>
        );
    }
}

const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}


export default connect(state=> ({networkId: state.web3Data.networkId}))(Tab);

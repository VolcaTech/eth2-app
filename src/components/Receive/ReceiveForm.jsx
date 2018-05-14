import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { sendSmsToPhone } from '../../services/eth2phone';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import Spinner from './../common/Spinner';
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
	    phoneIsValid,
	};


	
	this.secretCode = queryParams.code;
	this.networkId = queryParams.chainId || "1";	

	console.log(this)
        this.state = {
            errorMessage: "",
	    step: 'confirm-details',
	    fetching: false	    
        };
    }

    async _sendSmsToPhone() {
	try {

	    if (this.networkId && this.networkId != this.props.networkId) {
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
	    // disabling button
	    this.setState({fetching: false});	    
	}
    }
    
    _onSubmit() {
	// disabling button
	this.setState({fetching: true});

	// sending request for sms-code
	 this._sendSmsToPhone();
    }


    _renderConfirmDetailsForm() {
	return (
	    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 215}}>
            <div style={{display: 'block', margin: 'auto', width: '70%', textAlign: 'center', fontSize: 15, lineHeight: 1, fontFamily: 'SF Display Regular',}}><div style={{fontFamily: 'SF Display Bold', display: 'inline'}}>Eth-2-phone</div> allows to send Ethereum to anybody by simply verifying phone number.</div>
	      <div style={{width: '40%', margin: 'auto', textAlign: 'center', color: '#2bc64f', fontSize: 18, fontFamily: 'SF Display Black'}}>0.2423 ETH</div>
          <div style={{width: '78%', margin: 'auto'}}>
		<NumberInput backgroundColor='#f5f5f5' disabled={true} placeholder={this.phoneParams.phone} />
	      </div>

	      <div style={{ height: 28, textAlign: 'center', paddingTop: 8 }}>
		{ this.state.fetching ?
		    <div style={{width: 20, margin: 'auto'}}>
			  <Spinner/>
			</div> :
		    <span style={{color: '#ef4234', fontSize: 9}}>{this.state.errorMessage}</span>
		}

		
	      </div>
	      <div style={{width: '78%', margin: 'auto'}}>
		<ButtonPrimary
		   handleClick={this._onSubmit.bind(this)}
		   disabled={this.state.fetching}		   
		   buttonColor={e2pColors.green}>
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
	    <Row>
              <Col sm={4} smOffset={4}>	
		<div style={{ alignContent: 'center' }}>
		  <div><img src={e2pLogo} style={{ display: 'block', margin: 'auto', marginTop: 17, marginBottom: 28 }} /></div>		  
		  <div>
		    { this.state.step === 'confirm-details' ?
		    this._renderConfirmDetailsForm() : <ConfirmSmsForm {...props}/> }
		  </div>		  
		</div>
	      </Col>
	    </Row>
        );
    }
}

const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}


export default connect(state=> ({networkId: state.web3Data.networkId}))(Tab);

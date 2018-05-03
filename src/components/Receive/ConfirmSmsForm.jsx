import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withdrawTransfer } from '../../actions/transfer';
import { sendSmsToPhone } from '../../services/eth2phone';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import Button from './../common/ButtonSmall';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import Timer from 'react-timer-component';
import PropTypes from 'prop-types';
//import PendingTransfer from './PendingTransfer';

const Countdown = (props, context) => {
    const d = new Date(context.remaining);
    const { seconds } = {
	seconds: d.getUTCSeconds(),
    };
    return (
	<p>{`${seconds}`}</p>
    );
};

Countdown.contextTypes = {
    remaining: PropTypes.number,
};
    

const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}



class ConfirmSmsForm extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    smsCode: "",
	    timer: true,
	    buttonDisabled: true,
	    buttonOpacity: 0.1,
            errorMessage: ""	    
	};
    }
        
    async _confirmSmsAndWithdrawTransfer() {
	try {
	    const withdrawParams = {
		phone: this.props.phone,
		phoneCode: this.props.phoneCode,
		secretCode: this.props.secretCode,
		smsCode: this.state.smsCode
	    };
	    console.log({withdrawParams});	    
	    const transfer = await this.props.withdrawTransfer(withdrawParams);
	    this.props.history.push(`/transfers/${transfer.id}`);
	} catch(err) {
	    this.setState({ errorMessage: err.message });
	}	
    }

    _onSubmit() {	
	this._confirmSmsAndWithdrawTransfer();
    }

    async _sendSmsAgain() {
	this.setState({timer: true, buttonDisabled: true, buttonOpacity: 0.1});
	try {
	    const result = await sendSmsToPhone({
	    	phone: this.props.phone,
	    	secretCode: this.props.secretCode,
	    	phoneCode: this.props.phoneCode
	    });
	} catch(err) {
	    this.setState({ errorMessage: err.message });
	}
    }
    

    
    render() {
	return (
	    <div>
	      <div style={{ height: 28, width: 224, margin: 'auto', marginBottom: 46, display: 'block', textAlign: 'center', fontSize: 12 }}>Eth2phone allows to send Ether to anybody using phone number</div>
	      <div style={{ height: 22, width: 286, display: 'block', margin: 'auto', marginBottom: 28, textAlign: 'center', fontSize: 18 }}>Enter SMS code you've received</div>
              <NumberInput placeholder="Code from SMS" onChange={({target}) => this.setState({ smsCode: target.value })} />
		<div style={{ height: 28, color: '#ef4234', fontSize: 9, textAlign: 'center', paddingTop: 8 }}>
		  {this.state.errorMessage}
		</div>
		
		<div style={{ width: 285, height: 38, display: 'block', margin: 'auto', marginTop: 11, marginBottom: 43 }}>
		  <div style={{ display: 'inline-block', float: 'left' }}>
		    <Button
		       buttonColor='#0099ff'
		       opacity={this.state.buttonOpacity}
		       disabled={this.state.buttonDisabled}		       
		       onClick={this._sendSmsAgain.bind(this)}>Send again</Button>
		  </div>
		  <div style={{ display: 'inline-block', float: 'right' }}>
		    <Button buttonColor='#2bc64f' onClick={this._onSubmit.bind(this)}>Receive</Button>
		  </div>
		</div>
		{this.state.timer ? (<div style={{ height: 28, width: 210, margin: 'auto', marginBottom: 46, display: 'block', textAlign: 'center', fontSize: 12 }}>Send code again in <Timer style={{ display: 'inline-block' }} afterComplete={() => this.setState({buttonDisabled: false, buttonOpacity: 1, timer: false})} interval={1000} remaining={60000}>
				     <Countdown />
				     </Timer> seconds
		</div>) : null}
	    </div>
	)
    }
}


export default connect(null, { withdrawTransfer, sendSmsToPhone })(ConfirmSmsForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withdrawTransfer } from '../../actions/transfer';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
//import PendingTransfer from './PendingTransfer';


class ConfirmSmsForm extends Component {
    constructor(props) {
        super(props);
	
        this.state = {
	    smsCode: '',
            errorMessage: ""
        };
    }
    
    async _confirmSmsAndWithdrawTransfer() {
	try {
	    await this.props.withdrawTransfer({
		phone: this.props.phone,
		phoneCode: this.props.phoneCode,
		secretCode: this.props.secretCode,
		smsCode: this.state.smsCode
	    });
	} catch(err) {
	    this.setState({ errorMessage: err.message });
	}	
    }

    _onSubmit() {	
	this._confirmSmsAndWithdrawTransfer();
    }
    
    render() {
        return (
	    <div>
	      <div>
		<NumberInput
		   onChange={({target}) => {
		       const smsCode = target.value;
		       console.log({smsCode, target});
		       this.setState({smsCode});
		  }}
		   disabled={false} placeholder="Code from SMS" />
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
}

const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}


export default connect(null, { withdrawTransfer })(ConfirmSmsForm);

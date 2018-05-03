import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendTransfer } from '../../actions/transfer';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import { isValidPhoneNumber } from 'react-phone-number-input';


function WrongNetworkMessage() {
    return (
        <div>At this stage of the project we only support Ropsten network. Please switch to Ropsten in your web3 network provider.</div>
    );
}


class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
	    amount: 0,
            errorMessage: ""
        };
    }

    async _sendTransfer({phone, phoneCode}) {
	try {
	    const transfer = await this.props.sendTransfer({
	    	amount: this.state.amount,
	    	phone,
	    	phoneCode
	    });
	    this.props.history.push(`/transfers/${transfer.id}`);
	} catch(err) {
	    console.log(err);
	    this.setState({ errorMessage: err.message });
	}
    }
    
    _onSubmit() {
	// hack for issue with phonenumber lib - https://github.com/bl00mber/react-phone-input-2/issues/10	
	const phoneCode = this.phoneNumber.state.selectedCountry.dialCode;	
	let phone = this.phoneNumber.state.formattedNumber;
	// remove formatting from phone number
	phone = "+" + phone.replace(/\D+/g, "");
	
	// check that phone number is valid
	// if (!isValidPhoneNumber(phone)) {
	//     this.setState({ errorMessage: "Phone number is invalid" });
	//     return null;
	// };

	// // check amount
	// if (this.state.amount <= 0) {
	//     this.setState({ errorMessage: "Amount should be more than 0" });
	//     return null;
	// };

	
	// this.setState({showPendingTransfer: true, step: 1});	
	this._sendTransfer({phone, phoneCode});
    };

    _renderForm() {
	return (
	    <div>
	      <div style={{ marginBottom: 17 }}>
		<NumberInput
		   onChange={({target}) => {
		       const amount = target.value;
		       this.setState({amount});
		  }}
		  disabled={false}
		  fontColor='black'
		  backgroundColor='#fff'
		  placeholder="amount (ETH)"
		  />
	     
	      </div>

	      <div style={{ height: 28, color: '#ef4234', fontSize: 9, textAlign: 'center', paddingTop: 8 }}>
		{this.state.errorMessage}
	      </div>
	      
              <div style={{display: 'block', margin: 'auto', width: 295,}}>		
		<PhoneInput _ref={(ref) => { this.phoneNumber = ref; }}/>
	      </div>

	      
	      <div style={{ marginTop: 28 }}>
		<ButtonPrimary handleClick={this._onSubmit.bind(this)} buttonColor={e2pColors.green}>
		  Send
		</ButtonPrimary>
	      </div>
	    </div>	    
	);
    }
    
    render() {
        return (
            <div style={{ alignContent: 'center' }}>
              <div><img src={e2pLogo} style={{ display: 'block', margin: 'auto', marginTop: 17, marginBottom: 28 }} /></div>	      
	      { this._renderForm() }
            </div>
        );
    }
}

const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}


export default connect(null, { sendTransfer })(Tab);

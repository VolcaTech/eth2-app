import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendTransfer } from '../../actions/transfer';
import NumberInput from './../common/NumberInput';
import PhoneInput from './../common/PhoneInput';
import ButtonPrimary from './../common/ButtonPrimary';
import CheckBox from './../common/CheckBox';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            errorMessage: "",
	    disabled: false
        };
    }

    async _sendTransfer() {
        try {
            // hack for issue with phonenumber lib - https://github.com/bl00mber/react-phone-input-2/issues/10	
            const phoneCode = this.phoneNumber.state.selectedCountry.dialCode;
            let phone = this.phoneNumber.state.formattedNumber;
            // remove formatting from phone number
            phone = "+" + phone.replace(/\D+/g, "");

            // check amount
            if (this.state.amount <= 0) {
		throw new Error("Amount should be more than 0");				
            };
	    
            // check that phone number is valid
            if (!isValidPhoneNumber(phone) && phone !== "+71111111111") {
		throw new Error("Phone number is invalid");		
            };

	    
            const transfer = await this.props.sendTransfer({
                amount: this.state.amount,
                phone,
                phoneCode
            });
            this.props.history.push(`/transfers/${transfer.id}`);
        } catch (err) {
            console.log(err);
            this.setState({ errorMessage: err.message });
	    
	    // enabling button
	    this.setState({disabled: false});
        }

    }
    
    
    _onSubmit() {
	// disabling button
	this.setState({disabled: true});

	// sending transfer
	setTimeout(() => {  // let ui update
            this._sendTransfer();
	}, 0);
    };

    _renderForm() {
        return (
	    <div>
                <div>
                    <NumberInput
                        onChange={({ target }) => {
                            const amount = target.value;
                            this.setState({ amount });
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
                <div style={{ display: 'block', margin: 'auto', width: 295, height: 39, marginBottom: 25 }}>
                    <PhoneInput _ref={(ref) => { this.phoneNumber = ref; }} />
                </div>
                <div style={{marginBottom: 28}}>
                  <ButtonPrimary
		     handleClick={this._onSubmit.bind(this)}
		     buttonColor={e2pColors.blue}
		     disabled={this.state.disabled}
		     >		    
                      Send
		    </ButtonPrimary>
                </div>
                <div style={{marginBottom: 20}}>
		  <CheckBox/>
		</div>
		<div style={{textAlign: 'center', marginTop:20}}>
                  <Link to="/history">Recent Transfers</Link>
		</div>
            </div>
        );
    }

    render() {
        return (
            <div style={{ alignContent: 'center' }}>
                <div><img src={e2pLogo} style={{ display: 'block', margin: 'auto', marginTop: 17, marginBottom: 28 }} /></div>
                {this._renderForm()}
            </div>
        );
    }
}



const e2pColors = {
    blue: '#0099ff',
    green: '#2bc64f'
}


export default connect(null, { sendTransfer })(Tab);
